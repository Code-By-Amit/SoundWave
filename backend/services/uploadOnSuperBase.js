// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
const fs = require("fs")
const path = require('path')
require('dotenv').config();

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadMusicFile(filePath) {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        console.error('❌ File does not exist:', filePath);
        return;
    }

    const bucketName = process.env.SUPABASE_BUCKET_NAME;
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    const storagePath = `music/${fileName}`;

    try {
        // Upload the music file to Supabase
        const { data, error } = await supabase.storage.from(bucketName).upload(storagePath, fileBuffer, {
            contentType: getMimeType(fileName),
            cacheControl: '3600',
            upsert: false, // Prevent overwriting existing files
        });

        if (error) {
            console.error('❌ Upload failed:', error.message);
            return;
        }

        // Get the public URL
        const { data: publicUrlData, error: urlError } = supabase.storage.from(bucketName).getPublicUrl(storagePath);

        if (urlError || !publicUrlData) {
            console.error('❌ Failed to retrieve public URL:', urlError?.message);
            return null;
        }

        const publicUrl = publicUrlData.publicUrl;

        // Delete the file locally
        fs.unlink(filePath, (err) => {
            if(err) throw err
        });

        return publicUrl;
    } catch (err) {
        console.error('⚠️ An unexpected error occurred:', err);
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

    // Extract relative path if a full URL is provided
    const relativePath = filePath.startsWith('http')
        ? decodeURIComponent(filePath.split('/object/public/song/')[1])
        : filePath;

    const bucketName = process.env.SUPABASE_BUCKET_NAME;
    const { data, error } = await supabase.storage.from(bucketName).remove([relativePath]);

    if (error) {
        console.error('❌ Error deleting file:', error.message);
        return false;
    }

    return true;
}

module.exports = { uploadMusicFile, deleteMusicFromSuperbase };


