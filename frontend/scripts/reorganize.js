import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROJECT_STRUCTURE } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const PAGES_DIR = path.join(SRC_DIR, 'pages');
const STYLES_DIR = path.join(SRC_DIR, 'styles');
const LIB_DIR = path.join(SRC_DIR, 'lib');

// Crear directorios si no existen
function createDirectories() {
  const directories = [
    COMPONENTS_DIR,
    PAGES_DIR,
    STYLES_DIR,
    LIB_DIR,
    path.join(COMPONENTS_DIR, 'layout'),
    path.join(COMPONENTS_DIR, 'common'),
    path.join(COMPONENTS_DIR, 'jugadores')
  ];

  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directorio creado: ${dir}`);
    }
  });
}

// Mover archivos a sus nuevas ubicaciones
function moveFiles() {
  // Mover componentes de layout
  const layoutComponents = ['Navbar', 'Footer', 'Banner'];
  layoutComponents.forEach(component => {
    const oldPath = path.join(COMPONENTS_DIR, `${component}.jsx`);
    const newPath = path.join(COMPONENTS_DIR, 'layout', `${component}.jsx`);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Movido: ${oldPath} -> ${newPath}`);
    }
  });

  // Mover componentes comunes
  const commonComponents = ['JugadorCard', 'MapaUbicacion'];
  commonComponents.forEach(component => {
    const oldPath = path.join(COMPONENTS_DIR, `${component}.jsx`);
    const newPath = path.join(COMPONENTS_DIR, 'common', `${component}.jsx`);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Movido: ${oldPath} -> ${newPath}`);
    }
  });

  // Mover componentes de jugadores
  const jugadoresComponents = ['JugadorCard'];
  jugadoresComponents.forEach(component => {
    const oldPath = path.join(COMPONENTS_DIR, `${component}.jsx`);
    const newPath = path.join(COMPONENTS_DIR, 'jugadores', `${component}.jsx`);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Movido: ${oldPath} -> ${newPath}`);
    }
  });

  // Mover páginas
  PROJECT_STRUCTURE.pages.forEach(page => {
    const oldPath = path.join(SRC_DIR, 'pages', `${page}.jsx`);
    const newPath = path.join(PAGES_DIR, `${page}.jsx`);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Movido: ${oldPath} -> ${newPath}`);
    }
  });

  // Mover estilos
  PROJECT_STRUCTURE.styles.forEach(style => {
    const oldPath = path.join(SRC_DIR, 'styles', style);
    const newPath = path.join(STYLES_DIR, style);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Movido: ${oldPath} -> ${newPath}`);
    }
  });

  // Mover utilidades
  PROJECT_STRUCTURE.lib.forEach(lib => {
    const oldPath = path.join(SRC_DIR, 'lib', lib);
    const newPath = path.join(LIB_DIR, lib);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Movido: ${oldPath} -> ${newPath}`);
    }
  });
}

// Actualizar imports en los archivos
function updateImports() {
  const files = [
    path.join(SRC_DIR, 'App.jsx'),
    ...PROJECT_STRUCTURE.components.layout.map(c => path.join(COMPONENTS_DIR, 'layout', `${c}.jsx`)),
    ...PROJECT_STRUCTURE.components.common.map(c => path.join(COMPONENTS_DIR, 'common', `${c}.jsx`)),
    ...PROJECT_STRUCTURE.components.jugadores.map(c => path.join(COMPONENTS_DIR, 'jugadores', `${c}.jsx`)),
    ...PROJECT_STRUCTURE.pages.map(p => path.join(PAGES_DIR, `${p}.jsx`))
  ];

  files.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Actualizar imports de componentes de layout
      PROJECT_STRUCTURE.components.layout.forEach(component => {
        const oldImport = `from './components/${component}'`;
        const newImport = `from './components/layout/${component}'`;
        content = content.replace(new RegExp(oldImport, 'g'), newImport);
      });

      // Actualizar imports de componentes comunes
      PROJECT_STRUCTURE.components.common.forEach(component => {
        const oldImport = `from './components/${component}'`;
        const newImport = `from './components/common/${component}'`;
        content = content.replace(new RegExp(oldImport, 'g'), newImport);
      });

      // Actualizar imports de componentes de jugadores
      PROJECT_STRUCTURE.components.jugadores.forEach(component => {
        const oldImport = `from './components/${component}'`;
        const newImport = `from './components/jugadores/${component}'`;
        content = content.replace(new RegExp(oldImport, 'g'), newImport);
      });

      // Actualizar imports de páginas
      PROJECT_STRUCTURE.pages.forEach(page => {
        const oldImport = `from '../pages/${page}'`;
        const newImport = `from './${page}'`;
        content = content.replace(new RegExp(oldImport, 'g'), newImport);
      });

      fs.writeFileSync(file, content);
      console.log(`Actualizado imports en: ${file}`);
    }
  });
}

// Ejecutar reorganización
function reorganize() {
  try {
    console.log('Iniciando reorganización...');
    createDirectories();
    moveFiles();
    updateImports();
    console.log('Reorganización completada exitosamente!');
  } catch (error) {
    console.error('Error durante la reorganización:', error);
  }
}

reorganize(); 