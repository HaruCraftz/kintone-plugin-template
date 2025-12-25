import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import 'dotenv/config';

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const rootDir = path.resolve(__dirname, '..');
  const pluginPath = path.join(rootDir, 'plugin', 'plugin.zip');

  const requiredEnvVars = ['KINTONE_BASE_URL', 'KINTONE_USERNAME', 'KINTONE_PASSWORD'];

  try {
    // 検証
    const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    if (!fs.existsSync(pluginPath)) {
      throw new Error(`Plugin file not found: ${pluginPath}`);
    }

    console.log(`🚀 Uploading new plugin...`);

    // kintone-plugin-uploader の実行
    await new Promise((resolve, reject) => {
      const uploaderProcess = spawn('kintone-plugin-uploader', [pluginPath], { shell: true });
      uploaderProcess.stdout.on('data', (data) => process.stdout.write(data.toString()));
      uploaderProcess.stderr.on('data', (data) => process.stderr.write(data.toString()));
      uploaderProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Uploader exited with code ${code}`));
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
