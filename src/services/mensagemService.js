import api from './api';

// Serviço para gerenciar mensagens e conversas
export const mensagemService = {
  // Listar conversas do usuário
  async listarConversas() {
    try {
      const response = await api.get('/mensagens/conversas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar conversas:', error);
      throw error;
    }
  },

  // Obter mensagens de uma conversa específica
  async obterMensagens(conversaId) {
    try {
      const response = await api.get(`/mensagens/conversa/${conversaId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter mensagens:', error);
      throw error;
    }
  },

  // Enviar nova mensagem
  async enviarMensagem(dados) {
    try {
      const response = await api.post('/mensagens/enviar', dados);
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  },

  // Marcar mensagens como lidas
  async marcarComoLidas(conversaId) {
    try {
      const response = await api.put(`/mensagens/conversa/${conversaId}/lidas`);
      return response.data;
    } catch (error) {
      console.error('Erro ao marcar como lidas:', error);
      throw error;
    }
  },

  // Silenciar/desilenciar conversa
  async silenciarConversa(conversaId) {
    try {
      const response = await api.put(`/mensagens/conversa/${conversaId}/silenciar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao silenciar conversa:', error);
      throw error;
    }
  },

  // Bloquear/desbloquear usuário
  async bloquearUsuario(conversaId) {
    try {
      const response = await api.put(`/mensagens/conversa/${conversaId}/bloquear`);
      return response.data;
    } catch (error) {
      console.error('Erro ao bloquear usuário:', error);
      throw error;
    }
  },

  // Apagar conversa
  async apagarConversa(conversaId) {
    try {
      const response = await api.delete(`/mensagens/conversa/${conversaId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao apagar conversa:', error);
      throw error;
    }
  },

  // Buscar usuários para nova conversa
  async buscarUsuarios(busca = '') {
    try {
      const response = await api.get(`/mensagens/usuarios?busca=${encodeURIComponent(busca)}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  // Iniciar nova conversa
  async iniciarConversa(destinatarioId, vagaId = null) {
    try {
      const response = await api.post('/mensagens/conversa', {
        destinatarioId,
        vagaId
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao iniciar conversa:', error);
      throw error;
    }
  }
};

export default mensagemService; 