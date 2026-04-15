// Admin Panel JavaScript - Blog Management with Firebase Firestore

let db;
let blogs = [];
let deleteBlogId = null;

// Initialize Firebase when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Firebase to be ready
    if (window.firebaseDB) {
        db = window.firebaseDB;
        initAdmin();
    } else {
        document.addEventListener('firebaseReady', function() {
            db = window.firebaseDB;
            initAdmin();
        });
    }
});

function initAdmin() {
    loadBlogs();
    setupEventListeners();
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', filterBlogs);
    document.getElementById('filterStatus').addEventListener('change', filterBlogs);
    
    // Form submission
    document.getElementById('blogForm').addEventListener('submit', handleFormSubmit);
}

// Load all blogs from Firestore
async function loadBlogs() {
    try {
        showLoading(true);
        
        const snapshot = await db.collection('blogs')
            .orderBy('createdAt', 'desc')
            .get();
        
        blogs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        updateStats();
        renderBlogs();
        showLoading(false);
    } catch (error) {
        console.error('Error loading blogs:', error);
        showNotification('Error loading blogs', 'error');
        showLoading(false);
    }
}

// Update statistics
function updateStats() {
    const total = blogs.length;
    const published = blogs.filter(b => b.status === 'published').length;
    const drafts = blogs.filter(b => b.status === 'draft').length;
    
    document.getElementById('totalBlogs').textContent = total;
    document.getElementById('publishedBlogs').textContent = published;
    document.getElementById('draftBlogs').textContent = drafts;
}

// Render blogs table
function renderBlogs(blogsToRender = blogs) {
    const tbody = document.getElementById('blogTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (blogsToRender.length === 0) {
        tbody.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    tbody.innerHTML = blogsToRender.map(blog => `
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="py-4 px-4">
                <div class="flex items-center space-x-3">
                    <img src="${blog.image || 'assets/images/blog-placeholder.jpg'}" 
                         alt="${blog.title}" 
                         class="w-12 h-12 rounded-lg object-cover">
                    <div>
                        <h4 class="font-semibold text-gray-800">${blog.title}</h4>
                        <p class="text-sm text-gray-500">${blog.author}</p>
                    </div>
                </div>
            </td>
            <td class="py-4 px-4">
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    ${blog.category}
                </span>
            </td>
            <td class="py-4 px-4">
                <span class="status-badge ${blog.status === 'published' ? 'status-published' : 'status-draft'}">
                    ${blog.status === 'published' ? 'Published' : 'Draft'}
                </span>
            </td>
            <td class="py-4 px-4 text-gray-600">
                ${formatDate(blog.createdAt)}
            </td>
            <td class="py-4 px-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                    <button onclick="editBlog('${blog.id}')" 
                            class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteBlog('${blog.id}')" 
                            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter blogs
function filterBlogs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    
    let filtered = blogs;
    
    if (searchTerm) {
        filtered = filtered.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm) ||
            blog.category.toLowerCase().includes(searchTerm) ||
            blog.author.toLowerCase().includes(searchTerm)
        );
    }
    
    if (statusFilter !== 'all') {
        filtered = filtered.filter(blog => blog.status === statusFilter);
    }
    
    renderBlogs(filtered);
}

// Open modal for adding new blog
function openModal(blogId = null) {
    const modal = document.getElementById('blogModal');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtnText = document.getElementById('submitBtnText');
    const form = document.getElementById('blogForm');
    
    if (blogId) {
        // Edit mode
        const blog = blogs.find(b => b.id === blogId);
        if (!blog) return;
        
        modalTitle.textContent = 'Edit Blog';
        submitBtnText.textContent = 'Update Blog';
        
        document.getElementById('blogId').value = blog.id;
        document.getElementById('blogTitle').value = blog.title;
        document.getElementById('blogCategory').value = blog.category;
        document.getElementById('blogExcerpt').value = blog.excerpt;
        document.getElementById('blogContent').value = blog.content || blog.plainTextContent || ''; // Show HTML content in textarea
        document.getElementById('blogAuthor').value = blog.author;
        document.getElementById('blogStatus').value = blog.status;
        document.getElementById('blogImage').value = blog.image || '';
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Blog';
        submitBtnText.textContent = 'Create Blog';
        form.reset();
        document.getElementById('blogId').value = '';
    }
    
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('blogModal').classList.remove('active');
    document.getElementById('blogForm').reset();
    document.getElementById('blogId').value = '';
}

// Handle form submission (Create/Update)
async function handleFormSubmit(e) {
    e.preventDefault();
    
    console.log('Form submission started');
    
    // Check if Firebase is initialized
    if (!db) {
        console.error('Firebase not initialized');
        showNotification('Firebase not initialized. Please check your configuration.', 'error');
        return;
    }
    
    const blogId = document.getElementById('blogId').value;
    const contentTextarea = document.getElementById('blogContent');
    const rawContent = contentTextarea.value;
    
    // Store content as HTML (preserve HTML tags)
    const blogData = {
        title: document.getElementById('blogTitle').value,
        category: document.getElementById('blogCategory').value,
        excerpt: document.getElementById('blogExcerpt').value,
        content: rawContent, // Store as HTML
        plainTextContent: stripHtml(rawContent), // Store plain text version for search/preview
        author: document.getElementById('blogAuthor').value,
        status: document.getElementById('blogStatus').value,
        image: document.getElementById('blogImage').value || 'assets/images/blog-placeholder.jpg',
        updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
    };
    
    console.log('Blog data prepared:', blogData);
    
    try {
        if (blogId) {
            // Update existing blog
            console.log('Updating blog with ID:', blogId);
            await db.collection('blogs').doc(blogId).update(blogData);
            showNotification('Blog updated successfully!', 'success');
        } else {
            // Create new blog
            console.log('Creating new blog');
            blogData.createdAt = window.firebase.firestore.FieldValue.serverTimestamp();
            const docRef = await db.collection('blogs').add(blogData);
            console.log('Blog created with ID:', docRef.id);
            showNotification('Blog created successfully!', 'success');
        }
        
        closeModal();
        loadBlogs();
    } catch (error) {
        console.error('Error saving blog:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        showNotification('Error saving blog: ' + error.message, 'error');
    }
}

// Strip HTML tags for plain text version
function stripHtml(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

// Edit blog
function editBlog(blogId) {
    openModal(blogId);
}

// Delete blog
function deleteBlog(blogId) {
    deleteBlogId = blogId;
    document.getElementById('deleteModal').classList.add('active');
}

// Confirm delete
async function confirmDelete() {
    if (!deleteBlogId) return;
    
    try {
        await db.collection('blogs').doc(deleteBlogId).delete();
        showNotification('Blog deleted successfully!', 'success');
        closeDeleteModal();
        loadBlogs();
    } catch (error) {
        console.error('Error deleting blog:', error);
        showNotification('Error deleting blog. Please try again.', 'error');
    }
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    deleteBlogId = null;
}

// Close modal
function closeModal() {
    document.getElementById('blogModal').classList.remove('active');
    document.getElementById('blogForm').reset();
    document.getElementById('blogId').value = '';
}

// Show/hide loading state
function showLoading(show) {
    const loadingState = document.getElementById('loadingState');
    if (show) {
        loadingState.classList.remove('hidden');
    } else {
        loadingState.classList.add('hidden');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Format date
function formatDate(timestamp) {
    if (!timestamp) return '-';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Logout function
function logout() {
    // Implement logout logic here
    window.location.href = 'index.html';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const blogModal = document.getElementById('blogModal');
    const deleteModal = document.getElementById('deleteModal');
    
    if (event.target === blogModal) {
        closeModal();
    }
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
}

// Edit blog
function editBlog(blogId) {
    openModal(blogId);
}

// Delete blog
function deleteBlog(blogId) {
    deleteBlogId = blogId;
    document.getElementById('deleteModal').classList.add('active');
}

// Confirm delete
async function confirmDelete() {
    if (!deleteBlogId) return;
    
    try {
        await db.collection('blogs').doc(deleteBlogId).delete();
        showNotification('Blog deleted successfully!', 'success');
        closeDeleteModal();
        loadBlogs();
    } catch (error) {
        console.error('Error deleting blog:', error);
        showNotification('Error deleting blog. Please try again.', 'error');
    }
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    deleteBlogId = null;
}

// Show/hide loading state
function showLoading(show) {
    const loadingState = document.getElementById('loadingState');
    if (show) {
        loadingState.classList.remove('hidden');
    } else {
        loadingState.classList.add('hidden');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Format date
function formatDate(timestamp) {
    if (!timestamp) return '-';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Logout function
function logout() {
    // Implement logout logic here
    window.location.href = 'index.html';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const blogModal = document.getElementById('blogModal');
    const deleteModal = document.getElementById('deleteModal');
    
    if (event.target === blogModal) {
        closeModal();
    }
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
}
