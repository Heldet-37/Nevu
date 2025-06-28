import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PerfilEmpresa() {
  const { user } = useAuth()
  const [editando, setEditando] = useState(false)
  const [formData, setFormData] = useState({
    nomeFantasia: user?.nome || 'Empresa Exemplo',
    razaoSocial: 'Empresa Exemplo Ltda',
    cnpj: '12.345.678/0001-99',
    email: user?.email || 'empresa@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Empresas, 123 - São Paulo, SP',
    descricao: 'Empresa líder no setor de tecnologia, focada em inovação e desenvolvimento de soluções digitais.',
    setor: 'Tecnologia',
    tamanho: '50-100 funcionários',
    website: 'www.empresaexemplo.com.br'
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Perfil atualizado com sucesso! (Funcionalidade mockada)')
    setEditando(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Perfil da Empresa</h1>
        <button
          onClick={() => setEditando(!editando)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {editando ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Informações principais */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Informações da Empresa</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Fantasia
                  </label>
                  <input
                    type="text"
                    name="nomeFantasia"
                    value={formData.nomeFantasia}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razão Social
                  </label>
                  <input
                    type="text"
                    name="razaoSocial"
                    value={formData.razaoSocial}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CNPJ
                  </label>
                  <input
                    type="text"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  disabled={!editando}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Setor
                  </label>
                  <select
                    name="setor"
                    value={formData.setor}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Educação">Educação</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Varejo">Varejo</option>
                    <option value="Indústria">Indústria</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamanho da Empresa
                  </label>
                  <select
                    name="tamanho"
                    value={formData.tamanho}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="1-10 funcionários">1-10 funcionários</option>
                    <option value="11-50 funcionários">11-50 funcionários</option>
                    <option value="50-100 funcionários">50-100 funcionários</option>
                    <option value="100-500 funcionários">100-500 funcionários</option>
                    <option value="500+ funcionários">500+ funcionários</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Empresa
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  disabled={!editando}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              {editando && (
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditando(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sidebar com estatísticas */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Estatísticas</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Vagas publicadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Candidaturas recebidas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Vagas ativas</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h3>
            <div className="space-y-2">
              <button onClick={() => navigate('/empresa')} className="w-full text-left p-2 rounded hover:bg-gray-50 transition">
                📢 Publicar nova vaga
              </button>
              <button onClick={() => alert('Funcionalidade em breve!')} className="w-full text-left p-2 rounded hover:bg-gray-50 transition">
                📊 Ver relatórios
              </button>
              <button onClick={() => alert('Funcionalidade em breve!')} className="w-full text-left p-2 rounded hover:bg-gray-50 transition">
                🔒 Alterar senha
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 