const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : '/api';

let authToken = localStorage.getItem('adminToken');
let currentTab = 'coins';
let editingId = null;

const coinFields = [
  { name: 'package_name', label: 'Package Name', type: 'text', required: true },
  { name: 'coin_amount', label: 'Coin Amount', type: 'number', required: true },
  { name: 'price', label: 'Price (USD)', type: 'number', step: '0.01', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'gamemode', label: 'Gamemode', type: 'text', default: 'LIFESTEAL' },
  { name: 'image_url', label: 'Image URL', type: 'text', placeholder: 'assets/images/logo.png' },
  { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'], default: 'active' }
];

const rankFields = [
  { name: 'rank_name', label: 'Rank Name', type: 'text', required: true },
  { name: 'price', label: 'Price (USD)', type: 'number', step: '0.01', required: true },
  { name: 'duration_days', label: 'Duration (days)', type: 'number', required: true },
  { name: 'perk_description', label: 'Perk Description', type: 'textarea' },
  { name: 'badge_color', label: 'Badge Color', type: 'text', default: '#FF6B35', placeholder: '#FF6B35' },
  { name: 'image_url', label: 'Image URL', type: 'text', placeholder: 'assets/images/logo.png' },
  { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'], default: 'active' }
];

document.addEventListener('DOMContentLoaded', () => {
  if (authToken) {
    showDashboard();
    loadData();
  } else {
    showLogin();
  }
  
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  
  document.getElementById('addNewBtn').addEventListener('click', () => openModal());
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('cancelModal').addEventListener('click', closeModal);
  document.getElementById('modal').querySelector('.modal-overlay').addEventListener('click', closeModal);
  document.getElementById('itemForm').addEventListener('submit', handleSubmit);
}

function showLogin() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'flex';
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('loginError');
  
  try {
    const res = await fetch(`${API_URL}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      errorEl.textContent = data.error || 'Login failed';
      return;
    }
    
    authToken = data.token;
    localStorage.setItem('adminToken', authToken);
    showDashboard();
    loadData();
  } catch (err) {
    errorEl.textContent = 'Connection error. Is backend running?';
  }
}

function handleLogout() {
  localStorage.removeItem('adminToken');
  authToken = null;
  showLogin();
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `${tab}Tab`);
  });
  document.getElementById('tabTitle').textContent = tab === 'coins' ? 'Coin Packages' : 'Ranks';
}

async function loadData() {
  await Promise.all([loadCoins(), loadRanks()]);
}

async function loadCoins() {
  try {
    const res = await fetch(`${API_URL}/admin/coins`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const coins = await res.json();
    renderCoinsTable(coins);
  } catch (err) {
    console.error('Failed to load coins:', err);
  }
}

async function loadRanks() {
  try {
    const res = await fetch(`${API_URL}/admin/ranks`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const ranks = await res.json();
    renderRanksTable(ranks);
  } catch (err) {
    console.error('Failed to load ranks:', err);
  }
}

function renderCoinsTable(coins) {
  const tbody = document.getElementById('coinsTableBody');
  if (coins.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading-spinner">No coin packages found</td></tr>';
    return;
  }
  
  tbody.innerHTML = coins.map(coin => `
    <tr>
      <td>${escapeHtml(coin.package_name)}</td>
      <td>${coin.coin_amount.toLocaleString()}</td>
      <td>$${coin.price.toFixed(2)}</td>
      <td>${escapeHtml(coin.gamemode || '-')}</td>
      <td><span class="status-badge ${coin.status}">${coin.status}</span></td>
      <td>
        <button class="btn-action btn-edit" onclick="editItem('coins', '${coin._id}')">Edit</button>
        <button class="btn-action btn-delete" onclick="deleteItem('coins', '${coin._id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function renderRanksTable(ranks) {
  const tbody = document.getElementById('ranksTableBody');
  if (ranks.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading-spinner">No ranks found</td></tr>';
    return;
  }
  
  tbody.innerHTML = ranks.map(rank => `
    <tr>
      <td>${escapeHtml(rank.rank_name)}</td>
      <td>$${rank.price.toFixed(2)}</td>
      <td>${rank.duration_days === -1 ? 'Permanent' : rank.duration_days + ' days'}</td>
      <td><span style="display:inline-block;width:20px;height:20px;background:${rank.badge_color};border-radius:4px;vertical-align:middle;margin-right:8px;"></span>${rank.badge_color}</td>
      <td><span class="status-badge ${rank.status}">${rank.status}</span></td>
      <td>
        <button class="btn-action btn-edit" onclick="editItem('ranks', '${rank._id}')">Edit</button>
        <button class="btn-action btn-delete" onclick="deleteItem('ranks', '${rank._id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function openModal(item = null) {
  editingId = item ? item._id : null;
  const fields = currentTab === 'coins' ? coinFields : rankFields;
  const title = editingId ? `Edit ${currentTab === 'coins' ? 'Coin Package' : 'Rank'}` : `Add New ${currentTab === 'coins' ? 'Coin Package' : 'Rank'}`;
  
  document.getElementById('modalTitle').textContent = title;
  
  const formFields = document.getElementById('formFields');
  formFields.innerHTML = fields.map(field => {
    let input = '';
    const value = item ? item[field.name] : (field.default || '');
    
    if (field.type === 'select') {
      input = `<select name="${field.name}" ${field.required ? 'required' : ''}>
        ${field.options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('')}
      </select>`;
    } else if (field.type === 'textarea') {
      input = `<textarea name="${field.name}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>${value}</textarea>`;
    } else {
      input = `<input type="${field.type}" name="${field.name}" value="${value}" placeholder="${field.placeholder || ''}" ${field.step ? `step="${field.step}"` : ''} ${field.required ? 'required' : ''}>`;
    }
    
    return `<div class="form-group">
      <label>${field.label}</label>
      ${input}
    </div>`;
  }).join('');
  
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  editingId = null;
}

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  Object.keys(data).forEach(key => {
    const field = (currentTab === 'coins' ? coinFields : rankFields).find(f => f.name === key);
    if (field?.type === 'number') {
      data[key] = parseFloat(data[key]) || 0;
    }
  });
  
  const endpoint = currentTab === 'coins' ? 'coins' : 'ranks';
  const url = editingId ? `${API_URL}/admin/${endpoint}/${editingId}` : `${API_URL}/admin/${endpoint}`;
  const method = editingId ? 'PUT' : 'POST';
  
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || 'Failed to save');
      return;
    }
    
    closeModal();
    loadData();
  } catch (err) {
    alert('Failed to save. Is backend running?');
  }
}

async function editItem(type, id) {
  currentTab = type;
  const endpoint = type === 'coins' ? 'coins' : 'ranks';
  
  try {
    const res = await fetch(`${API_URL}/admin/${endpoint}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const items = await res.json();
    const item = items.find(i => i._id === id);
    
    if (item) {
      openModal(item);
    }
  } catch (err) {
    alert('Failed to load item');
  }
}

async function deleteItem(type, id) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  const endpoint = type === 'coins' ? 'coins' : 'ranks';
  
  try {
    const res = await fetch(`${API_URL}/admin/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    
    if (res.ok) {
      loadData();
    } else {
      alert('Failed to delete');
    }
  } catch (err) {
    alert('Failed to delete');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

window.editItem = editItem;
window.deleteItem = deleteItem;