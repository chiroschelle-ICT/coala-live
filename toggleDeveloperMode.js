const fs = require('fs');
const path = require('path');

const filePaths = [
    path.join('./src/app/app-routing.module.ts'),
    path.join('./src/app/leden-actions/leden-actions-routing.module.ts'),
    path.join('./src/app/admin/admin-routing.module.ts'),
    path.join('./src/app/random-number/random-number-routing.module.ts'),
];

// Function to toggle canActivate in a file
const toggleCanActivateInFile = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return;
        }

        // Toggle the canActivate lines
        const toggledData = data.replace(/\/\/?\s*(canActivate:\s*\[AuthGuard\])/g, (match, p1) => {
            return match.startsWith('//') ? p1 : `// ${p1}`;
        });

        // Write the modified content back to the file
        fs.writeFile(filePath, toggledData, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file ${filePath}:`, err);
            } else {
                console.log(`canActivate toggled successfully in ${filePath}`);
            }
        });
    });
};

// Loop through the array of file paths
filePaths.forEach(filePath => {
    toggleCanActivateInFile(filePath);
});
