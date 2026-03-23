<template>
  <div class="transactions-container">
    <div class="transactions-card">
      <div class="transactions-header">
        <h2>MIS TRANSACCIONES</h2>
        <p class="subtitle">Historial completo de tus movimientos</p>
        
        <!-- Indicador de filtro por método de última recarga -->
        <div v-if="showOnlyLastMethod" class="method-filter-indicator">
          <div class="filter-badge" :class="lastRechargeMethod === 'blockbee' ? 'filter-crypto' : 'filter-fiat'">
            <i v-if="lastRechargeMethod === 'blockbee'" class="fab fa-bitcoin me-2"></i>
            <i v-else class="fas fa-mobile-alt me-2"></i>
            Mostrando solo transacciones {{ lastRechargeMethod === 'blockbee' ? 'con Cripto (USDT)' : 'con Pago Móvil' }}
          </div>
          <small class="text-muted">Basado en tu última recarga</small>
        </div>
      </div>

      <!-- Mensaje de éxito -->
      <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ successMessage }}
        <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
      </div>

      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMessage }}
        <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
      </div>


     
      <!-- Tabla de transacciones -->
      <div class="transactions-table-section">
        <div class="table-header">
          <h3>Historial de Transacciones</h3>
          <div class="table-info">
            <span v-if="!isLoading">
              Mostrando {{ filteredTransactions.length }} de {{ totalTransactions }} transacciones
            </span>
          </div>
        </div>

        <div v-if="isLoading" class="loading-container">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando transacciones...</p>
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="empty-state">
          <i class="fas fa-receipt"></i>
          <h3>No hay transacciones</h3>
          <p>No se encontraron transacciones con los filtros seleccionados.</p>
        </div>

        <div v-else class="table-responsive">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Método</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in paginatedTransactions" :key="transaction.id" class="transaction-row">
                <td class="transaction-id">
                  <span class="id-badge">#{{ transaction.id }}</span>
                </td>
                <td class="transaction-type">
                  <span class="type-text" :class="getTypeTextClass(transaction.type_transaction)">
                    {{ getTypeLabel(transaction.type_transaction) == 'deposito' ? 'Deposito' : 'Retiro' }}
                  </span>
                </td>
                <td class="transaction-description">
                  <span class="description-text">{{ transaction.description || 'Sin descripción' }}</span>
                </td>
                <td class="transaction-method">
                  <span class="method-badge" :class="transaction.payment_method === 'blockbee' ? 'method-crypto' : 'method-fiat'">
                    {{ transaction.payment_method === 'blockbee' ? 'USDT' : 'Pago Móvil' }}
                  </span>
                </td>
                <td class="transaction-amount">
                  <span class="amount" :class="getAmountClass(transaction.type_transaction)">
                    {{ getAmountPrefix(transaction.type_transaction) }}
                    {{ transaction.payment_method === 'blockbee' ? '$' : 'Bs' }} 
                    {{ Math.abs(transaction.amount).toFixed(2) }}
                  </span>
                </td>
                <td class="transaction-status">
                  <div class="status-stack">
                    <span class="status-text" :class="getStatusTextClass(transaction.status)">
                      {{ getStatusLabel(transaction.status) }}
                    </span>

                    <div v-if="transaction.payment_method === 'blockbee' && transaction.blockbee_payment" class="mt-1">
                      <span class="blockbee-badge" :class="'bb-' + transaction.blockbee_payment.payment_status">
                        BLOCKBEE: {{ transaction.blockbee_payment.payment_status.toUpperCase() }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="transaction-date">
                  <div class="date-info">
                    <span class="date">{{ formatDate(transaction.created_at) }}</span>
                    <span class="time">{{ formatTime(transaction.created_at) }}</span>
                  </div>
                </td>
                <td class="transaction-actions">
                  <button 
                    type="button" 
                    class="btn-details" 
                    @click="showTransactionDetails(transaction)"
                    title="Ver detalles"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div v-if="totalPages > 1" class="pagination-section">
          <div class="pagination-info">
            Página {{ currentPage }} de {{ totalPages }}
          </div>
          <div class="pagination-controls">
            <button 
              type="button" 
              class="btn-pagination" 
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              <i class="fas fa-chevron-left"></i>
              Anterior
            </button>
            
            <div class="page-numbers">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                type="button" 
                class="btn-page" 
                :class="{'active': page === currentPage}"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              type="button" 
              class="btn-pagination" 
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
            >
              Siguiente
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de detalles de transacción -->
    <div v-if="selectedTransaction" class="modal-overlay" @click="closeTransactionDetails">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Detalles de Transacción</h3>
          <button type="button" class="modal-close" @click="closeTransactionDetails">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="transaction-details">
            <div class="detail-row">
              <label>ID de Transacción:</label>
              <span>#{{ selectedTransaction.id }}</span>
            </div>
            <div class="detail-row">
              <label>Fecha:</label>
              <span>{{ formatFullDate(selectedTransaction.created_at) }}</span>
            </div>

            <hr class="modal-divider">

            <div class="detail-row">
              <label>Tipo:</label>
              <span class="type-text" :class="getTypeTextClass(selectedTransaction.type_transaction)">
                {{ getTypeLabel(selectedTransaction.type_transaction) }}
              </span>
            </div>
            <div class="detail-row">
              <label>Método de Pago:</label>
              <span class="method-tag" :class="selectedTransaction.payment_method === 'blockbee' ? 'tag-crypto' : 'tag-fiat'">
                {{ selectedTransaction.payment_method === 'blockbee' ? 'USDT (Blockchain)' : 'Pago Móvil' }}
              </span>
            </div>

            <div class="detail-row">
              <label>Monto:</label>
              <span class="amount-detail" :class="getAmountClass(selectedTransaction.type_transaction)">
                {{ getAmountPrefix(selectedTransaction.type_transaction) }}
                {{ selectedTransaction.payment_method === 'blockbee' ? '$' : 'Bs' }} 
                {{ Math.abs(selectedTransaction.amount).toFixed(2) }}
              </span>
            </div>

            <div class="detail-row">
              <label>Estado Sistema:</label>
              <span class="status-text" :class="getStatusTextClass(selectedTransaction.status)">
                {{ getStatusLabel(selectedTransaction.status) }}
              </span>
            </div>

            <div v-if="selectedTransaction.blockbee_payment" class="blockbee-info-box">
              <p class="info-box-title"><i class="fab fa-ethereum"></i> Detalles de Pago Crypto</p>
              
              <div class="detail-row">
                <label>Orden ID:</label>
                <span class="mono-text">{{ selectedTransaction.blockbee_payment.order_id }}</span>
              </div>
              
              <div class="detail-row">
                <label>Estado BlockBee:</label>
                <span class="bb-status-label" :class="'bb-' + selectedTransaction.blockbee_payment.payment_status">
                  {{ selectedTransaction.blockbee_payment.payment_status.toUpperCase() }}
                </span>
              </div>

              <div class="detail-row" v-if="selectedTransaction.blockbee_payment.txid">
                <label>Hash (TXID):</label>
                <span class="txid-link" @click="copyToClipboard(selectedTransaction.blockbee_payment.txid)">
                  {{ selectedTransaction.blockbee_payment.txid.substring(0, 16) }}...
                  <i class="far fa-copy"></i>
                </span>
              </div>
            </div>

            <hr class="modal-divider">

            <div class="detail-row" v-if="selectedTransaction.reference">
              <label>Referencia:</label>
              <span class="mono-text">{{ selectedTransaction.reference }}</span>
            </div>
            <div class="detail-row" v-if="selectedTransaction.description">
              <label>Descripción:</label>
              <span>{{ selectedTransaction.description }}</span>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn-secondary" @click="closeTransactionDetails">
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay de verificación de pago BlockBee -->
    <div v-if="showBlockBeeOverlay" class="blockbee-overlay">
      <div class="blockbee-modal">
        <div class="blockbee-spinner">
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Verificando pago...</span>
          </div>
        </div>
        <p class="blockbee-message">
          {{ blockBeeMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transactions-container {
  margin-top: 120px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.transactions-card {
  max-width: 1400px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
}

.transactions-header {
  text-align: center;
  margin-bottom: 30px;
}

.transactions-header h2 {
  color: #e67e22;
  font-weight: 700;
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
}

.method-filter-indicator {
  text-align: center;
  margin-top: 20px;
  padding: 12px 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
}

.filter-crypto {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.filter-fiat {
  background-color: #e3f2fd;
  color: #1565c0;
  border: 1px solid #bbdefb;
}

.filters-section {
  background: white;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.filters-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 20px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.filter-group select {
  padding: 10px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.filter-group select:focus {
  outline: none;
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
}

.filter-actions {
  display: flex;
  align-items: center;
}

.btn-refresh {
  background: #e67e22;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-refresh:hover:not(:disabled) {
  background: #d35400;
  transform: translateY(-2px);
}

.btn-refresh:disabled {
  background: #f0ad4e;
  cursor: not-allowed;
  opacity: 0.7;
}

.summary-section {
  margin-bottom: 30px;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.summary-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
}

.summary-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.summary-icon.recharge {
  background: #28a745;
}

.summary-icon.withdrawal {
  background: #dc3545;
}

.summary-icon.bet {
  background: #6f42c1;
}

.summary-icon.win {
  background: #fd7e14;
}

.summary-content h3 {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 600;
}

.summary-amount {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.summary-amount.positive {
  color: #28a745;
}

.summary-amount.negative {
  color: #dc3545;
}

.transactions-table-section {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e9ecef;
}

.table-header h3 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.table-info {
  color: #6c757d;
  font-size: 0.9rem;
}

.loading-container {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #495057;
}

.empty-state p {
  margin: 0;
  font-size: 1.1rem;
}

.table-responsive {
  overflow-x: auto;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.transactions-table th {
  background: #f8f9fa;
  color: #495057;
  font-weight: 600;
  padding: 15px 10px;
  text-align: left;
  border-bottom: 2px solid #e9ecef;
  font-size: 0.9rem;
}

.transactions-table td {
  padding: 15px 10px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.transaction-row:hover {
  background: #f8f9fa;
}

.id-badge {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 1 !important;
  visibility: visible !important;
}

.type-badge.recharge {
  background: #d4edda !important;
  color: #155724 !important;
  opacity: 1 !important;
}

.type-badge.withdrawal {
  background: #f8d7da !important;
  color: #721c24 !important;
  opacity: 1 !important;
}

.type-badge.bet {
  background: #e2e3f1 !important;
  color: #383d41 !important;
  opacity: 1 !important;
}

.type-badge.win {
  background: #fff3cd !important;
  color: #856404 !important;
  opacity: 1 !important;
}

.type-badge.unknown {
  background: #e9ecef !important;
  color: #495057 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.type-badge.dep {
  background: #d1ecf1 !important;
  color: #0c5460 !important;
  opacity: 1 !important;
}

.description-text {
  color: #495057 !important;
  font-weight: 500;
}

.type-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.type-deposit {
  color: #28a745 !important;
}

.type-withdrawal {
  color: #dc3545 !important;
}

.type-unknown {
  color: #6c757d !important;
}

.status-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.status-pending {
  color: #ffc107 !important;
}

.status-approved {
  color: #28a745 !important;
}

.status-rejected {
  color: #dc3545 !important;
}

.status-unknown {
  color: #6c757d !important;
}

.amount {
  font-weight: 700;
  font-size: 1.1rem;
}

.amount-positive {
  color: #28a745 !important;
}

.amount-negative {
  color: #dc3545 !important;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 1 !important;
  visibility: visible !important;
}

.status-badge.pending {
  background: #fff3cd !important;
  color: #856404 !important;
  opacity: 1 !important;
}

.status-badge.approved {
  background: #d4edda !important;
  color: #155724 !important;
  opacity: 1 !important;
}

.status-badge.rejected {
  background: #f8d7da !important;
  color: #721c24 !important;
  opacity: 1 !important;
}

.status-badge.completed {
  background: #d1ecf1 !important;
  color: #0c5460 !important;
  opacity: 1 !important;
}

.status-badge.unknown {
  background: #e9ecef !important;
  color: #495057 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.date {
  font-weight: 600;
  color: #495057;
}

.time {
  font-size: 0.8rem;
  color: #6c757d;
}

.btn-details {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-details:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.pagination-info {
  color: #6c757d;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-pagination {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
}

.btn-pagination:hover:not(:disabled) {
  background: #5a6268;
}

.btn-pagination:disabled {
  background: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.btn-page {
  background: #e9ecef;
  color: #495057;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  min-width: 40px;
}

.btn-page:hover {
  background: #dee2e6;
}

.btn-page.active {
  background: #e67e22;
  color: white;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #f8f9fa;
  color: #495057;
}

.modal-body {
  padding: 20px;
}

.transaction-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f8f9fa;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row label {
  font-weight: 600;
  color: #495057;
  min-width: 120px;
}

.detail-row span {
  color: #6c757d;
  text-align: right;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #5a6268;
}

/* Overlay de verificación BlockBee */
.blockbee-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.blockbee-modal {
  background: #1f2933;
  border-radius: 16px;
  padding: 30px 24px;
  max-width: 380px;
  width: 90%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  text-align: center;
  color: #f9fafb;
}

.blockbee-spinner {
  margin-bottom: 16px;
}

.blockbee-message {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .transactions-container {
    padding: 80px 10px 20px 10px;
  }
  
  .transactions-card {
    padding: 15px;
  }
  
  .transactions-header h2 {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .table-header h3 {
    font-size: 1.2rem;
  }
  
  .table-info {
    font-size: 0.8rem;
  }
  
  .filters-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .summary-card {
    padding: 15px;
  }
  
  .table-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .transactions-table {
    font-size: 0.85rem;
  }
  
  .transactions-table th {
    padding: 10px 8px;
    font-size: 0.85rem;
  }
  
  .transactions-table td {
    padding: 10px 8px;
    font-size: 0.85rem;
  }
  
  .id-badge {
    font-size: 0.75rem;
    padding: 3px 6px;
  }
  
  .type-text, .status-text {
    font-size: 0.8rem;
  }
  
  .description-text {
    font-size: 0.85rem;
  }
  
  .amount {
    font-size: 0.9rem;
  }
  
  .pagination-section {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}
/* Contenedor para alinear los badges uno sobre otro */
.status-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.mt-1 {
  margin-top: 4px;
}

/* Badge estilo BlockBee */
.blockbee-badge {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  letter-spacing: 0.5px;
  background: #1a1a1a; /* Fondo oscuro para que resalte */
}

/* Colores según el estado de la API de BlockBee */
.bb-paid {
  color: #2ecc71;
  border: 1px solid #2ecc71;
}

.bb-pending {
  color: #f1c40f;
  border: 1px solid #f1c40f;
}

.bb-partially_paid {
  color: #e67e22;
  border: 1px solid #e67e22;
}

.bb-canceled {
  color: #e74c3c;
  border: 1px solid #e74c3c;
}
.method-badge {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
}

.method-crypto {
  background-color: #e8f5e9;
  color: #2e7d32; /* Verde esmeralda para USDT */
  border: 1px solid #c8e6c9;
}

.method-fiat {
  background-color: #e3f2fd;
  color: #1565c0; /* Azul para Pago Móvil */
  border: 1px solid #bbdefb;
}

/* Ajuste para que el monto resalte más con el cambio de moneda */
.amount {
  white-space: nowrap;
  font-family: 'Roboto Mono', monospace; /* Opcional: para que los números alineen bien */
}

.modal-divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 15px 0;
}

.amount-detail {
  font-size: 1.4rem;
  font-weight: 800;
}

.mono-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  color: #444;
}

/* Caja de info Crypto */
.blockbee-info-box {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-left: 4px solid #f1c40f;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
}

.info-box-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.txid-link {
  color: #007bff;
  cursor: pointer;
  font-size: 0.85rem;
  text-decoration: underline;
}

.bb-status-label {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.bb-paid { background: #d4edda; color: #155724; }
.bb-pending { background: #fff3cd; color: #856404; }

.method-tag {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}
.tag-crypto { background: #e1f5fe; color: #0277bd; }
.tag-fiat { background: #f3e5f5; color: #7b1fa2; }
</style>

<script>
import api from '@/services/api';

export default {
  name: 'TransactionsView',
  data() {
    return {
      transactions: [],
      filteredTransactions: [],
      selectedTransaction: null,
      isLoading: false,
      errorMessage: '',
      successMessage: '',
      filters: {
        type: '',
        status: '',
        period: ''
      },
      summary: {
        totalRecharges: 0,
        totalWithdrawals: 0,
        totalBets: 0,
        totalWins: 0
      },
      currentPage: 1,
      itemsPerPage: 10,
      totalTransactions: 0,

      // Estado para verificación de pagos BlockBee
      showBlockBeeOverlay: false,
      blockBeeMessage: 'Verificando pago con BlockBee…',
      blockBeeOrderId: null,
      blockBeeAttempts: 0,
      blockBeeMaxAttempts: 3,
      
      // Para mostrar solo el método de la última recarga
      lastRechargeMethod: null,
      showOnlyLastMethod: false
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    },
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTransactions.slice(start, end);
    },
    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    }
  },
  async mounted() {
    await this.loadLastRecharge();
    await this.loadTransactions();
    await this.handleBlockBeeReturn();
  },
  methods: {
    // Cargar última recarga para determinar método preferido
    async loadLastRecharge() {
      try {
        console.log('Cargando última recarga en TransactionsView...');
        
        // Intentar diferentes parámetros para obtener depósitos
        let response;
        try {
          // Primer intento con type=dep
          response = await api.get('/api/transactions?limit=1&type=dep', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
        } catch (e) {
          console.log('Error con type=dep, intentando con type=deposito');
          // Segundo intento con type=deposito
          response = await api.get('/api/transactions?limit=1&type=deposito', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
        }
        
        console.log('Respuesta de API en TransactionsView:', response.data);
        
        if (response.data.transactions && response.data.transactions.length > 0) {
          const lastRecharge = response.data.transactions[0];
          console.log('Última recarga cruda en TransactionsView:', lastRecharge);
          
          this.lastRechargeMethod = lastRecharge.payment_method;
          this.showOnlyLastMethod = true;
          
          console.log('Última recarga encontrada en TransactionsView:', {
            method: this.lastRechargeMethod,
            id: lastRecharge.id,
            date: lastRecharge.created_at,
            payment_method: lastRecharge.payment_method,
            showOnlyLastMethod: this.showOnlyLastMethod
          });
        } else {
          console.log('No se encontraron transacciones de depósito en TransactionsView, intentando sin filtro');
          // Intentar sin filtro de tipo, solo obtener la última transacción
          const allResponse = await api.get('/api/transactions?limit=5', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
          
          console.log('Respuesta sin filtro en TransactionsView:', allResponse.data);
          
          if (allResponse.data.transactions && allResponse.data.transactions.length > 0) {
            // Buscar la primera transacción que sea un depósito
            const lastDeposit = allResponse.data.transactions.find(t => 
              t.type_transaction === 'dep' || 
              t.type_transaction === 'deposito' ||
              t.type_transaction === 'deposit'
            );
            
            if (lastDeposit) {
              console.log('Depósito encontrado en TransactionsView:', lastDeposit);
              this.lastRechargeMethod = lastDeposit.payment_method;
              this.showOnlyLastMethod = true;
              
              console.log('Última recarga encontrada (sin filtro) en TransactionsView:', {
                method: this.lastRechargeMethod,
                id: lastDeposit.id,
                date: lastDeposit.created_at,
                payment_method: lastDeposit.payment_method
              });
            } else {
              console.log('No se encontraron depósitos en las transacciones recientes en TransactionsView');
              this.showOnlyLastMethod = false;
            }
          } else {
            console.log('No se encontraron transacciones en TransactionsView');
            this.showOnlyLastMethod = false;
          }
        }
      } catch (error) {
        console.error('Error al cargar última recarga en TransactionsView:', error);
        // Si hay error, mostramos todos los métodos por defecto
        this.showOnlyLastMethod = false;
      }
    },
    
    // Cargar transacciones
    async loadTransactions() {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        
        const params = new URLSearchParams();
        if (this.filters.type) params.append('type', this.filters.type);
        if (this.filters.status) params.append('status', this.filters.status);
        if (this.filters.period) params.append('period', this.filters.period);
        
        const response = await api.get(`/api/transactions?${params.toString()}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });

        // --- AÑADE ESTO AQUÍ ---
        console.log("DATOS DESDE LA API:", response.data);
        // -----------------------
        
        this.transactions = response.data.transactions || [];
        this.totalTransactions = response.data.total || this.transactions.length;
        this.summary = response.data.summary || {
          totalRecharges: 0,
          totalWithdrawals: 0,
          totalBets: 0,
          totalWins: 0
        };
        
        this.applyFilters();
        this.currentPage = 1;
        
      } catch (error) {
        console.error('Error al cargar transacciones:', error);
        this.errorMessage = 'Error al cargar las transacciones. Por favor, intenta de nuevo.';
      } finally {
        this.isLoading = false;
      }
    },
    
    // Aplicar filtros
    applyFilters() {
      let filtered = [...this.transactions];
      
      // Si showOnlyLastMethod es true, filtrar por el método de la última recarga
      if (this.showOnlyLastMethod && this.lastRechargeMethod) {
        filtered = filtered.filter(t => t.payment_method === this.lastRechargeMethod);
      }
      
      if (this.filters.type) {
        filtered = filtered.filter(t => t.type_transaction === this.filters.type);
      }
      
      if (this.filters.status) {
        filtered = filtered.filter(t => t.status === this.filters.status);
      }
      
      if (this.filters.period) {
        const now = new Date();
        const filterDate = new Date();
        
        switch (this.filters.period) {
          case 'today':
            filterDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            filterDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            filterDate.setMonth(now.getMonth() - 1);
            break;
          case 'last_month': {
            filterDate.setMonth(now.getMonth() - 2);
            const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            filtered = filtered.filter(t => {
              const transactionDate = new Date(t.created_at);
              return transactionDate >= filterDate && transactionDate <= endOfLastMonth;
            });
            break;
          }
        }
        
        if (this.filters.period !== 'last_month') {
          filtered = filtered.filter(t => new Date(t.created_at) >= filterDate);
        }
      }
      
      this.filteredTransactions = filtered;
    },
    
    // Obtener clase CSS para texto de tipo de transacción
    getTypeTextClass(type_transaction) {
      if (!type_transaction || type_transaction === 'null' || type_transaction === 'undefined' || type_transaction === '') {
        return 'type-unknown';
      }
      const type = type_transaction.toLowerCase();
      if (type === 'dep' || type === 'deposito') {
        return 'type-deposit';
      } else if (type === 'withdrawal' || type === 'retiro') {
        return 'type-withdrawal';
      }
      return 'type-unknown';
    },
    
    // Obtener icono para tipo de transacción
    getTypeIcon(type_transaction) {
      if (!type_transaction) return 'fas fa-exchange-alt';
      const icons = {
        recharge: 'fas fa-plus-circle',
        withdrawal: 'fas fa-minus-circle',
        bet: 'fas fa-dice',
        win: 'fas fa-trophy',
        dep: 'fas fa-arrow-down'
      };
      return icons[type_transaction.toLowerCase()] || 'fas fa-exchange-alt';
    },
    
    // Obtener etiqueta para tipo de transacción
    getTypeLabel(type_transaction) {
      if (!type_transaction || type_transaction === 'null' || type_transaction === 'undefined') return 'Desconocido';
      const labels = {
        recharge: 'Recarga',
        withdrawal: 'Retiro',
        bet: 'Apuesta',
        win: 'Ganancia',
        dep: 'Depósito'
      };
      return labels[type_transaction.toLowerCase()] || type_transaction;
    },
    
    // Obtener clase CSS para monto
    getAmountClass(type_transaction) {
      if (!type_transaction) return 'amount-negative';
      const type = type_transaction.toLowerCase();
      if (type === 'dep' || type === 'deposito') {
        return 'amount-positive';
      } else if (type === 'withdrawal' || type === 'retiro') {
        return 'amount-negative';
      }
      return 'amount-negative';
    },
    
    // Obtener prefijo para monto
    getAmountPrefix(type_transaction) {
      if (!type_transaction) return '-';
      const type = type_transaction.toLowerCase();
      if (type === 'dep' || type === 'deposito') {
        return '+';
      } else if (type === 'withdrawal' || type === 'retiro') {
        return '-';
      }
      return '-';
    },
    
    // Obtener clase CSS para texto de estado
    getStatusTextClass(status) {
      if (!status || status === 'null' || status === 'undefined' || status === '') {
        return 'status-unknown';
      }
      const statusLower = status.toLowerCase();
      if (statusLower === 'pending' || statusLower === 'pendiente') {
        return 'status-pending';
      } else if (statusLower === 'approved' || statusLower === 'aprobado') {
        return 'status-approved';
      } else if (statusLower === 'rejected' || statusLower === 'rechazado') {
        return 'status-rejected';
      }
      return 'status-unknown';
    },
    
    // Obtener etiqueta para estado
    getStatusLabel(status) {
      if (!status) return 'Desconocido';
      const labels = {
        pending: 'Pendiente',
        approved: 'Aprobado',
        rejected: 'Rechazado',
        completed: 'Completado'
      };
      return labels[status.toLowerCase()] || status;
    },
    
    // Formatear fecha
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    },
    
    // Formatear hora
    formatTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    // Formatear fecha completa
    formatFullDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    // Mostrar detalles de transacción
    showTransactionDetails(transaction) {
      this.selectedTransaction = transaction;
    },
    
    // Cerrar detalles de transacción
    closeTransactionDetails() {
      this.selectedTransaction = null;
    },
    
    // Ir a página específica
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    // ==============================
    // Verificación de pagos BlockBee
    // ==============================

    async handleBlockBeeReturn() {
      try {
        const orderId = this.$route?.query?.order_id;
        if (!orderId) {
          return;
        }

        this.blockBeeOrderId = orderId;
        this.blockBeeAttempts = 0;
        this.showBlockBeeOverlay = true;
        this.blockBeeMessage = 'Verificando pago con BlockBee…';
        this.errorMessage = '';
        this.successMessage = '';

        await this.checkBlockBeePayment();
      } catch (e) {
        // Si algo falla aquí, no bloquear la pantalla
        console.error('Error en handleBlockBeeReturn:', e);
        this.showBlockBeeOverlay = false;
      }
    },

    async checkBlockBeePayment() {
      this.blockBeeAttempts += 1;

      try {
        const response = await api.get('/api/recharge/blockbee/confirm', {
          params: { order_id: this.blockBeeOrderId }
        });

        const data = response.data || {};

        if (data.success !== true) {
          // Caso success === false
          this.showBlockBeeOverlay = false;
          this.errorMessage = 'No se pudo validar el pago en este momento. Intenta nuevamente más tarde.';
          this.clearOrderIdFromUrl();
          return;
        }

        // success === true
        // Siempre refrescar listado de transacciones
        await this.loadTransactions();

        if (data.code === 'PAYMENT_RECEIVED' || data.payment_status === 'paid') {
          this.showBlockBeeOverlay = false;
          this.successMessage = 'Pago recibido correctamente. Las monedas se acreditarán cuando el administrador apruebe la recarga.';
          this.clearOrderIdFromUrl();
          return;
        }

        if (data.code === 'PAYMENT_PENDING' || data.payment_status === 'pending') {
          if (this.blockBeeAttempts < this.blockBeeMaxAttempts) {
            // Mantener overlay y reintentar
            this.blockBeeMessage = 'El pago aún está pendiente de confirmación en BlockBee… Reintentando verificación.';
            setTimeout(() => {
              this.checkBlockBeePayment();
            }, 5000);
            return;
          }

          // Después de reintentos sigue pendiente
          this.showBlockBeeOverlay = false;
          this.errorMessage = 'El pago aún está pendiente de confirmación en BlockBee.';
          this.clearOrderIdFromUrl();
          return;
        }

        // Cualquier otro código inesperado pero success === true
        this.showBlockBeeOverlay = false;
        this.successMessage = data.message || 'Estado de pago actualizado.';
        this.clearOrderIdFromUrl();
      } catch (error) {
        console.error('Error al verificar pago BlockBee:', error);

        // Manejar 404 específicamente
        if (error.response && error.response.status === 404) {
          const code = error.response.data?.code;
          if (code === 'ORDER_NOT_FOUND') {
            this.errorMessage = 'No se encontró la orden de pago. Si el problema persiste, contacta soporte.';
          } else {
            this.errorMessage = 'No se encontró la orden de pago.';
          }
        } else {
          // Errores de red u otros estados
          this.errorMessage = 'No se pudo validar el pago en este momento. Intenta nuevamente más tarde.';
        }

        this.showBlockBeeOverlay = false;
        this.clearOrderIdFromUrl();
      }
    },

    clearOrderIdFromUrl() {
      if (this.$route && this.$router) {
        const newQuery = { ...this.$route.query };
        if (newQuery.order_id) {
          delete newQuery.order_id;
          this.$router.replace({ query: newQuery }).catch(() => {});
        }
      }
    }
  }
};
</script>
