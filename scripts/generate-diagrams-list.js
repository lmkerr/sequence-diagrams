import { readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { capitalCase } from 'change-case';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootPath = dirname(__dirname); // Moves up one level from 'scripts' to the project root
const diagramsPath = join(rootPath, 'public', 'diagrams');

function readDirectory(dir, base = '') {
    const items = readdirSync(dir, { withFileTypes: true });
    let files = [];

    items.forEach(item => {
        const relativePath = join(base, item.name);
        if (item.isDirectory()) {
            files = files.concat(readDirectory(join(dir, item.name), relativePath));
        } else {
            const fileName = item.name.replace('.seqdiag', '').replace(/[_-]/g, ' ');
            const formattedName = capitalCase(fileName);
            files.push({
                name: formattedName,
                path: '/diagram/' + relativePath
            });

            // Log the name and path of the file
            console.log(`Processed file: ${formattedName} at ${relativePath}`);
        }
    });

    return files;
}

const diagramList = readDirectory(diagramsPath);
writeFileSync(join(rootPath, 'src/assets/data', 'diagram-list.json'), JSON.stringify(diagramList, null, 2));

console.log("Diagram list JSON written to:", join(rootPath, 'src', 'diagram-list.json'));
