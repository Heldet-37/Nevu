const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurar o armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Criar pasta uploads se não existir
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Gerar nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro para tipos de arquivo permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Documentos
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // Imagens
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas PDF, DOC, DOCX, JPG, PNG e WebP são aceitos.'), false);
  }
};

// Configurar multer para arquivos grandes
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB
  }
});

// Middleware específico para upload de currículo
const uploadCurriculo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido. Apenas PDF, DOC e DOCX são aceitos.'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB para currículos
  }
});

// Middleware específico para upload de imagens
const uploadImagem = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido. Apenas JPG, PNG e WebP são aceitos.'), false);
    }
  },
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB para imagens
  }
});

module.exports = {
  upload,
  uploadCurriculo,
  uploadImagem
}; 