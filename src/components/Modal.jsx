import { useState } from 'react'

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

// Componente específico para templates de mensagens
export function ModalTemplates({ isOpen, onClose, onSelectTemplate }) {
  const templates = [
    {
      id: 1,
      titulo: 'Convite para Entrevista',
      categoria: 'empresa',
      texto: 'Olá! Gostaríamos de convidá-lo(a) para uma entrevista. Podemos agendar para amanhã às 14h?'
    },
    {
      id: 2,
      titulo: 'Solicitação de Informações',
      categoria: 'empresa',
      texto: 'Obrigada pelo interesse! Poderia nos enviar mais detalhes sobre sua experiência na área?'
    },
    {
      id: 3,
      titulo: 'Feedback Positivo',
      categoria: 'empresa',
      texto: 'Adoramos seu perfil! Gostaríamos de prosseguir com o processo seletivo.'
    },
    {
      id: 4,
      titulo: 'Interesse na Vaga',
      categoria: 'candidato',
      texto: 'Olá! Vi a vaga e fiquei muito interessado(a). Posso enviar meu currículo?'
    },
    {
      id: 5,
      titulo: 'Pergunta sobre Benefícios',
      categoria: 'candidato',
      texto: 'Gostaria de saber mais sobre os benefícios oferecidos pela empresa.'
    },
    {
      id: 6,
      titulo: 'Confirmação de Entrevista',
      categoria: 'candidato',
      texto: 'Perfeito! Confirmo minha presença na entrevista. Obrigada pela oportunidade!'
    }
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Templates de Mensagens" size="lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => {
                onSelectTemplate(template.texto)
                onClose()
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800">{template.titulo}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  template.categoria === 'empresa' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {template.categoria === 'empresa' ? 'Empresa' : 'Candidato'}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{template.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

// Componente para configurações de notificações
export function ModalNotificacoes({ isOpen, onClose }) {
  const [configuracoes, setConfiguracoes] = useState({
    email: true,
    push: true,
    som: false,
    horarioInicio: '08:00',
    horarioFim: '18:00'
  })

  const handleChange = (key, value) => {
    setConfiguracoes(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurações de Notificações" size="md">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Tipos de Notificação</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={configuracoes.email}
                onChange={(e) => handleChange('email', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Notificações por email</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={configuracoes.push}
                onChange={(e) => handleChange('push', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Notificações push</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={configuracoes.som}
                onChange={(e) => handleChange('som', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Som de notificação</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-3">Horário de Recebimento</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Início</label>
              <input
                type="time"
                value={configuracoes.horarioInicio}
                onChange={(e) => handleChange('horarioInicio', e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Fim</label>
              <input
                type="time"
                value={configuracoes.horarioFim}
                onChange={(e) => handleChange('horarioFim', e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              alert('Configurações salvas!')
              onClose()
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  )
} 