const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function uploadMusicFile(filePath) {
    try {
        // Check if the file exists asynchronously
        await fs.promises.access(filePath);

        const bucketName = process.env.SUPABASE_BUCKET_NAME;
        const fileName = path.basename(filePath);
        const storagePath = `music/${fileName}`;

        // Convert file stream to Buffer
        const fileBuffer = await fs.promises.readFile(filePath);

        // Upload file
        const { data, error } = await supabase.storage.from(bucketName).upload(storagePath, fileBuffer, {
            contentType: getMimeType(fileName),
            cacheControl: '3600',
            upsert: false, // Prevent overwriting existing files
        });

        if (error) {
            console.error('❌ Upload failed:', error.message);
            return null;
        }

        // Get Public URL (Fixed)
        const publicUrl = supabase.storage.from(bucketName).getPublicUrl(storagePath);

        // Delete file locally after 2 seconds
        setTimeout(() => fs.unlink(filePath, () => {}), 2000);

        return publicUrl;
    } catch (err) {
        console.error('⚠️ Unexpected error:', err);
        return null;
    }
}

function getMimeType(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    const mimeTypes = {
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.flac': 'audio/flac',
        '.ogg': 'audio/ogg',
        '.aac': 'audio/aac',
        '.m4a': 'audio/mp4',
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

async function deleteMusicFromSuperbase(filePath) {
    const relativePath = filePath.startsWith('http')
        ? decodeURIComponent(filePath.split('/object/public/song/')[1])
        : filePath;

    const bucketName = process.env.SUPABASE_BUCKET_NAME;
    const { error } = await supabase.storage.from(bucketName).remove([relativePath]);

    if (error) {
        console.error('❌ Error deleting file:', error.message);
        return false;
    }

    return true;
}

module.exports = { uploadMusicFile, deleteMusicFromSuperbase };
