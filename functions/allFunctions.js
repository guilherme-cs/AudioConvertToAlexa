const ffmpeg = require('fluent-ffmpeg');

class Functions {

    async convertFile(filePath, outputPath) {
        const ffmpegArgs = [
            '-ac', '2',
            '-codec:a', 'libmp3lame',
            '-b:a', '48k',
            '-ar', '24000',
            '-write_xing', '0'
        ];
        return new Promise((resolve, reject) => {
            ffmpeg()
                .input(filePath)
                .outputOptions(ffmpegArgs)
                .output(outputPath)
                .on('error', (err) => {
                    reject({error: true, msg: err});
                })
                .on('end', () => {
                    console.log(`"${outputPath}"`);
                    resolve({error: false, filePath: outputPath});
                })
                .run();
        });
    }
}

module.exports = new Functions();