import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

export default function Candidaturas() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filtroStatus, setFiltroStatus] = useState('todas')
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(null)
  const [modalVaga, setModalVaga] = useState(false)
  const [modalDetalhes, setModalDetalhes] = useState(false)
  const [vagaSelecionada, setVagaSelecionada] = useState(null)
  const [feedbackCancelamento, setFeedbackCancelamento] = useState(null)
  const [showToast, setShowToast] = useState(null); // { type, message }

  const isEmpresa = user && user.tipo === 'empresa'

  // Mock de candidaturas para empresas (candidatos que se candidataram às vagas da empresa)
  const candidaturasEmpresa = [
    {
      id: 1,
      candidato: 'Hëlder Alves',
      email: 'helderalves@email.com',
      telefone: '(+258) 843390749',
      vaga: 'Desenvolvedor Frontend',
      dataCandidatura: '2024-01-15',
      status: 'pendente',
      experiencia: '3 anos',
      formacao: 'Ciência da Computação',
      curriculo: 'helderalves_cv.pdf',
      cartaApresentacao: 'Sou desenvolvedor apaixonado por criar interfaces intuitivas e responsivas. Tenho experiência com React, TypeScript e CSS moderno. Sempre busco aprender novas tecnologias e melhorar minhas habilidades. Acredito que posso contribuir significativamente para o crescimento da empresa com minha experiência e dedicação.'
    },
    {
      id: 2,
      candidato: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(+258) 872554074',
      vaga: 'Designer UX/UI',
      dataCandidatura: '2024-01-14',
      status: 'aprovada',
      experiencia: '5 anos',
      formacao: 'Design Gráfico',
      curriculo: 'maria_santos_cv.pdf',
      cartaApresentacao: 'Designer com foco em experiência do usuário e design de interfaces. Trabalhei em diversos projetos digitais, sempre priorizando a usabilidade e acessibilidade. Tenho experiência com Figma, Adobe Creative Suite e metodologias de design thinking.'
    },
    {
      id: 3,
      candidato: 'Pedro Costa',
      email: 'pedro@email.com',
      telefone: '(11) 77777-7777',
      vaga: 'Desenvolvedor Backend',
      dataCandidatura: '2024-01-13',
      status: 'rejeitada',
      experiencia: '2 anos',
      formacao: 'Sistemas de Informação',
      curriculo: 'pedro_costa_cv.pdf',
      cartaApresentacao: 'Desenvolvedor backend com experiência em Node.js, Python e bancos de dados. Sempre focado em escrever código limpo e escalável. Gosto de trabalhar em equipe e compartilhar conhecimento com outros desenvolvedores.'
    },
    {
      id: 4,
      candidato: 'Ana Oliveira',
      email: 'ana@email.com',
      telefone: '(11) 66666-6666',
      vaga: 'Desenvolvedor Frontend',
      dataCandidatura: '2024-01-12',
      status: 'entrevista',
      experiencia: '4 anos',
      formacao: 'Engenharia de Software',
      curriculo: 'ana_oliveira_cv.pdf',
      cartaApresentacao: 'Desenvolvedora frontend com experiência em React, Vue.js e Angular. Sempre busco criar interfaces intuitivas e performáticas. Tenho experiência com testes automatizados e metodologias ágeis.'
    }
  ]

  // Mock de candidaturas para candidatos (suas próprias candidaturas enviadas)
  const candidaturasCandidato = [
    {
      id: 1,
      empresa: 'TechCorp',
      vaga: 'Desenvolvedor Frontend',
      dataCandidatura: '2024-01-15',
      status: 'pendente',
      salario: 'MZN 4.000 - 6.000',
      localizacao: 'Gurue, Mozambique',
      tipo: 'Efetivo',
      email: user?.email
    },
    {
      id: 2,
      empresa: 'DesignStudio',
      vaga: 'Designer UX/UI',
      dataCandidatura: '2024-01-14',
      status: 'aprovada',
      salario: 'MZN 5.000 - 7.000',
      localizacao: 'Remoto',
      tipo: 'Prestador',
      email: user?.email
    },
    {
      id: 3,
      empresa: 'StartupXYZ',
      vaga: 'Desenvolvedor Full Stack',
      dataCandidatura: '2024-01-13',
      status: 'rejeitada',
      salario: 'MZN 6.000 - 8.000',
      localizacao: 'Milange, Mozambique',
      tipo: 'Efetivo',
      email: user?.email
    },
    {
      id: 4,
      empresa: 'BigTech',
      vaga: 'Desenvolvedor React',
      dataCandidatura: '2024-01-12',
      status: 'entrevista',
      salario: 'MZN 7.000 - 9.000',
      localizacao: 'Híbrido',
      tipo: 'Efetivo',
      email: user?.email
    }
  ]

  // Mock de detalhes das vagas
  const detalhesVagas = {
    'TechCorp': {
      empresa: 'TechCorp',
      vaga: 'Desenvolvedor Frontend',
      descricao: 'Estamos procurando um desenvolvedor frontend apaixonado por criar interfaces modernas e responsivas. Você trabalhará com React, TypeScript e CSS moderno.',
      requisitos: [
        'Experiência com React e TypeScript',
        'Conhecimento em CSS moderno (Flexbox, Grid)',
        'Familiaridade com Git',
        'Boa comunicação e trabalho em equipe'
      ],
      beneficios: [
        'Seguro de saúde',
        'Subsídio de alimentação',
        'Acesso a ginásio',
        'Horário flexível'
      ],
      salario: 'MZN 4.000 - 6.000',
      localizacao: 'Maputo, Mozambique',
      tipo: 'Efetivo',
      modalidade: 'Híbrido'
    },
    'DesignStudio': {
      empresa: 'DesignStudio',
      vaga: 'Designer UX/UI',
      descricao: 'Designer criativo para criar experiências digitais incríveis. Foco em design de interfaces e experiência do usuário.',
      requisitos: [
        'Portfólio com projetos de UX/UI',
        'Experiência com Figma',
        'Conhecimento em design systems',
        'Experiência com pesquisa de usuários'
      ],
      beneficios: [
        'Seguro de saúde',
        'Subsídio de alimentação',
        'Home office',
        'Flexibilidade de horários'
      ],
      salario: 'MZN 5.000 - 7.000',
      localizacao: 'Remoto',
      tipo: 'Prestador',
      modalidade: 'Remoto'
    },
    'StartupXYZ': {
      empresa: 'StartupXYZ',
      vaga: 'Desenvolvedor Full Stack',
      descricao: 'Desenvolvedor full stack para uma startup em crescimento. Você trabalhará com tecnologias modernas e terá impacto direto no produto.',
      requisitos: [
        'Experiência com Node.js e React',
        'Conhecimento em bancos de dados',
        'Experiência com APIs REST',
        'Vontade de aprender novas tecnologias'
      ],
      beneficios: [
        'Seguro de saúde',
        'Participação nos resultados',
        'Stock options',
        'Ambiente descontraído'
      ],
      salario: 'MZN 6.000 - 8.000',
      localizacao: 'Milange, Mozambique',
      tipo: 'Efetivo',
      modalidade: 'Presencial'
    },
    'BigTech': {
      empresa: 'BigTech',
      vaga: 'Desenvolvedor React',
      descricao: 'Desenvolvedor React para uma das maiores empresas de tecnologia de Moçambique. Trabalhe em projetos de grande escala.',
      requisitos: [
        'Experiência sólida com React',
        'Conhecimento em testes automatizados',
        'Experiência com microfrontends',
        'Inglês intermediário'
      ],
      beneficios: [
        'Seguro de saúde premium',
        'Subsídio de alimentação',
        'Acesso a ginásio',
        'Progressão de carreira',
        'Home office híbrido',
        'Progressão de carreira',
        'Participação em eventos e conferências',
        'Acesso a cursos e certificações'
      ],
      salario: 'MZN 7.000 - 9.000',
      localizacao: 'Beira, Mozambique',
      tipo: 'Efetivo',
      modalidade: 'Híbrido'
    }
  }

  const candidaturas = isEmpresa ? candidaturasEmpresa : candidaturasCandidato

  const candidaturasFiltradas = candidaturas.filter(candidatura => {
    if (filtroStatus === 'todas') return true
    return candidatura.status === filtroStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800'
      case 'aprovada': return 'bg-green-100 text-green-800'
      case 'rejeitada': return 'bg-red-100 text-red-800'
      case 'entrevista': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pendente': return 'Pendente'
      case 'aprovada': return 'Aprovada'
      case 'rejeitada': return 'Rejeitada'
      case 'entrevista': return 'Entrevista'
      default: return status
    }
  }

  const alterarStatus = (id, novoStatus) => {
    let statusLabel = '';
    let toastColor = 'bg-blue-500';
    switch (novoStatus) {
      case 'aprovada': statusLabel = 'Aprovada'; toastColor = 'bg-green-500'; break;
      case 'entrevista': statusLabel = 'Entrevista'; toastColor = 'bg-blue-500'; break;
      case 'rejeitada': statusLabel = 'Rejeitada'; toastColor = 'bg-red-500'; break;
      case 'pendente': statusLabel = 'Pendente'; toastColor = 'bg-yellow-500'; break;
      default: statusLabel = novoStatus; toastColor = 'bg-blue-500';
    }
    setShowToast({ type: 'success', message: `Status alterado para ${statusLabel}!`, color: toastColor });
    setTimeout(() => setShowToast(null), 2200);
  }

  const verVaga = (empresa) => {
    setVagaSelecionada(detalhesVagas[empresa])
    setModalVaga(true)
  }

  const verDetalhesCandidatura = (candidatura) => {
    setCandidatoSelecionado(candidatura)
    setModalDetalhes(true)
  }

  const handleCandidaturaClick = (candidatura) => {
    setCandidatoSelecionado(candidatura)
    // Abrir modal de detalhes para ambos (empresa e candidato)
    verDetalhesCandidatura(candidatura)
  }

  const cancelarCandidatura = (id) => {
    if (confirm('Tem certeza que deseja cancelar sua candidatura?\n\nEsta ação não pode ser desfeita.')) {
      // Simular cancelamento com feedback visual
      const candidatura = candidaturasCandidato.find(c => c.id === id)
      if (candidatura) {
        setFeedbackCancelamento({
          tipo: 'sucesso',
          mensagem: `Candidatura cancelada com sucesso!\n\nVaga: ${candidatura.vaga}\nEmpresa: ${candidatura.empresa}\n\nVocê pode se candidatar novamente a esta vaga se desejar.`,
          vaga: candidatura.vaga,
          empresa: candidatura.empresa
        })
        
        // Limpar feedback após 5 segundos
        setTimeout(() => {
          setFeedbackCancelamento(null)
        }, 5000)
        
        setModalDetalhes(false)
      } else {
        alert('Candidatura cancelada com sucesso!')
      }
    }
  }

  const podeCancelar = (status) => {
    return status === 'pendente' || status === 'aprovada' || status === 'entrevista'
  }

  const verPerfilCandidato = (candidato) => {
    setModalDetalhes(false)
    // Navegar para a página de funcionalidade em produção
    navigate('/em-producao')
  }

  const irParaMensagens = () => {
    setModalDetalhes(false)
    // Navegar para mensagens com informações do candidato/empresa
    if (candidatoSelecionado) {
      const destinatario = isEmpresa ? candidatoSelecionado.candidato : candidatoSelecionado.empresa
      navigate('/mensagens', { 
        state: { 
          destinatario,
          vaga: candidatoSelecionado.vaga,
          tipo: isEmpresa ? 'candidato' : 'empresa'
        }
      })
    } else {
      navigate('/mensagens')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
          {isEmpresa ? 'Candidaturas Recebidas' : 'Minhas Candidaturas'}
        </h1>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filtrar por status:</label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1 sm:flex-none"
              >
                <option value="todas">Todas</option>
                <option value="pendente">Pendentes</option>
                <option value="aprovada">Aprovadas</option>
                <option value="rejeitada">Rejeitadas</option>
                <option value="entrevista">Entrevista</option>
              </select>
            </div>
            <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full w-full sm:w-auto text-center">
              {candidaturasFiltradas.length} candidatura(s) encontrada(s)
            </span>
          </div>
        </div>

        {/* Lista de candidaturas */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-bold text-gray-800 text-lg">
              {isEmpresa ? 'Candidatos' : 'Vagas Candidatadas'}
            </h2>
          </div>
          <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
            {candidaturasFiltradas.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <span className="text-4xl mb-4 block">📋</span>
                <p className="text-lg font-medium">Nenhuma candidatura encontrada</p>
                <p className="text-sm">Tente ajustar os filtros ou aguarde novas candidaturas</p>
              </div>
            ) : (
              candidaturasFiltradas.map((candidatura) => (
                <div
                  key={candidatura.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0"
                >
                  <div onClick={() => handleCandidaturaClick(candidatura)} className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                        {isEmpresa ? candidatura.candidato.charAt(0) : candidatura.empresa.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-base">
                          {isEmpresa ? candidatura.candidato : candidatura.empresa}
                        </h3>
                        <p className="text-sm text-gray-600">{candidatura.vaga}</p>
                      </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidatura.status)}`}>{getStatusText(candidatura.status)}</span>
                  </div>
                  {/* Botão cancelar para o candidato logado */}
                  {!isEmpresa && user && user.tipo === 'candidato' && candidatura.email === user.email && podeCancelar(candidatura.status) && (
                    <button
                      onClick={() => cancelarCandidatura(candidatura.id)}
                      className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-xs font-medium flex items-center gap-2"
                    >
                      ❌ Cancelar Minha Candidatura
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal para ver vaga */}
      <Modal
        isOpen={modalVaga}
        onClose={() => setModalVaga(false)}
        title={`Vaga: ${vagaSelecionada?.vaga} - ${vagaSelecionada?.empresa}`}
        size="lg"
      >
        {vagaSelecionada && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Descrição da Vaga</h4>
              <p className="text-gray-600">{vagaSelecionada.descricao}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Requisitos</h4>
                <ul className="space-y-2">
                  {vagaSelecionada.requisitos.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Benefícios</h4>
                <ul className="space-y-2">
                  {vagaSelecionada.beneficios.map((ben, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">🎁</span>
                      <span className="text-gray-600">{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">💰</div>
                <div className="text-sm text-gray-600">Salário</div>
                <div className="font-medium">{vagaSelecionada.salario}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">📍</div>
                <div className="text-sm text-gray-600">Localização</div>
                <div className="font-medium">{vagaSelecionada.localizacao}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">📋</div>
                <div className="text-sm text-gray-600">Tipo</div>
                <div className="font-medium">{vagaSelecionada.tipo}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">🏢</div>
                <div className="text-sm text-gray-600">Modalidade</div>
                <div className="font-medium">{vagaSelecionada.modalidade}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal para detalhes da candidatura */}
      <Modal
        isOpen={modalDetalhes}
        onClose={() => setModalDetalhes(false)}
        title={isEmpresa ? `Detalhes de ${candidatoSelecionado?.candidato}` : "Detalhes da Candidatura"}
        size="lg"
      >
        {candidatoSelecionado && (
          <div className="flex flex-col md:flex-row md:gap-8 space-y-6 md:space-y-0">
            {/* Coluna Esquerda */}
            <div className="md:w-1/2 space-y-6">
              {/* Header com avatar, nome, status */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {isEmpresa ? candidatoSelecionado.candidato.charAt(0) : candidatoSelecionado.empresa.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-xl">
                    {isEmpresa ? candidatoSelecionado.candidato : candidatoSelecionado.empresa}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidatoSelecionado.status)}`}>
                    {getStatusText(candidatoSelecionado.status)}
                  </span>
                </div>
              </div>
              {/* Contatos (apenas para empresa) */}
              {isEmpresa && (
                <div className="bg-white border p-4 rounded-lg space-y-2">
                  <div><span className="text-gray-600">📧 Email:</span> <span className="font-medium">{candidatoSelecionado.email}</span></div>
                  <div><span className="text-gray-600">📞 Telefone:</span> <span className="font-medium">{candidatoSelecionado.telefone}</span></div>
                </div>
              )}
            {/* Informações da candidatura */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                📋 Informações da Candidatura
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">🎯 Vaga:</span>
                  <p className="font-medium">{candidatoSelecionado.vaga}</p>
                </div>
                <div>
                  <span className="text-gray-600">📅 Data:</span>
                  <p className="font-medium">{candidatoSelecionado.dataCandidatura}</p>
                </div>
                {isEmpresa && (
                  <>
                    <div>
                      <span className="text-gray-600">⏱️ Experiência:</span>
                      <p className="font-medium">{candidatoSelecionado.experiencia}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">🎓 Formação:</span>
                      <p className="font-medium">{candidatoSelecionado.formacao}</p>
                    </div>
                  </>
                )}
                {!isEmpresa && (
                  <>
                    <div>
                      <span className="text-gray-600">💰 Salário:</span>
                      <p className="font-medium">{candidatoSelecionado.salario}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">📍 Localização:</span>
                      <p className="font-medium">{candidatoSelecionado.localizacao}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">📋 Tipo:</span>
                      <p className="font-medium">{candidatoSelecionado.tipo}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            </div>
            {/* Coluna Direita */}
            <div className="md:w-1/2 space-y-6 flex flex-col">
              {/* Carta de apresentação (apenas para empresa) */}
            {isEmpresa && candidatoSelecionado.cartaApresentacao && (
                <div className="bg-white border border-gray-200 p-4 rounded-lg flex-1">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  💬 Carta de Apresentação
                </h5>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 leading-relaxed">
                  {candidatoSelecionado.cartaApresentacao}
                </div>
              </div>
            )}
              {/* Botões de ação */}
              <div className="flex flex-col gap-3 mt-auto">
              {isEmpresa ? (
                <>
                    <div className="grid grid-cols-3 gap-3">
                      <button 
                        onClick={() => verPerfilCandidato(candidatoSelecionado)}
                        className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium flex items-center justify-center gap-2"
                      >
                        👤 Ver Perfil
                      </button>
                    <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center gap-2">
                      📄 Baixar CV
                    </button>
                    <button 
                      onClick={irParaMensagens}
                      className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center justify-center gap-2"
                    >
                      💬 Mensagem
                    </button>
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-700 mb-3 text-sm">Alterar Status</h6>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => alterarStatus(candidatoSelecionado.id, 'aprovada')}
                        className="p-2 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition font-medium"
                      >
                        ✅ Aprovar
                      </button>
                      <button
                        onClick={() => alterarStatus(candidatoSelecionado.id, 'entrevista')}
                        className="p-2 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition font-medium"
                      >
                        📅 Entrevista
                      </button>
                      <button
                        onClick={() => alterarStatus(candidatoSelecionado.id, 'rejeitada')}
                        className="p-2 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition font-medium"
                      >
                        ❌ Rejeitar
                      </button>
                      <button
                        onClick={() => alterarStatus(candidatoSelecionado.id, 'pendente')}
                        className="p-2 bg-yellow-100 text-yellow-700 rounded text-xs hover:bg-yellow-200 transition font-medium"
                      >
                        ⏳ Pendente
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setModalDetalhes(false)
                      verVaga(candidatoSelecionado.empresa)
                    }}
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center gap-2"
                  >
                    👁️ Ver Vaga Completa
                  </button>
                  {/* Botão 'Ver Mensagens' removido */}
                  {!isEmpresa && user && user.tipo === 'candidato' && candidatoSelecionado && user.email === candidatoSelecionado.email && podeCancelar(candidatoSelecionado.status) ? (
                    <button 
                      onClick={() => {
                        cancelarCandidatura(candidatoSelecionado.id)
                        setModalDetalhes(false)
                      }}
                      className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium flex items-center justify-center gap-2"
                    >
                        ❌ Cancelar Minha Candidatura
                    </button>
                    ) : null}
                </>
              )}
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Feedback de cancelamento */}
      {feedbackCancelamento && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                ✅ Candidatura cancelada!
              </p>
              <p className="text-xs mt-1 opacity-90">
                {feedbackCancelamento.vaga} - {feedbackCancelamento.empresa}
              </p>
              <p className="text-xs mt-1 opacity-75">
                Você pode se candidatar novamente se desejar.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setFeedbackCancelamento(null)}
                className="text-green-100 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toast visual para status */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg text-white ${showToast.color || 'bg-green-500'}`}>
          {showToast.message}
        </div>
      )}
    </div>
  )
} 