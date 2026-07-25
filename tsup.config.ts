import {defineConfig} from 'tsup'

export default defineConfig({
    // Define o diretório raiz, que devem ser compilados
    entry: ['src'],
    // Define a saída dos arquivos ,ESModules
    format: ['esm'],
    // Diretório onde os arquivos javascript serão criados
    outDir: 'build',
    // Auxilia na hora de debugar o código
    sourcemap: true,
    shims: true, 
    // Diz a versão alvo do javascript que iremos utilizar
    target: 'esnext',
    
});