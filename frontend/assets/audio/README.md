# Audio Files Setup Guide

This directory is for the audio files used in the AfroEar learning experience.

## Required Audio Files

You need to add the following two audio files to this directory:

1. **`heis-rema.mp3`** - "Heis" by Rema (Afrobeat track)
2. **`mnike-tyler-icu.mp3`** - "Mnike" by Tyler ICU & Uncle Waffles (Amapiano track)

## How to Add Audio Files

### Option 1: Download from Streaming Services (Recommended)

1. **Purchase or download** the tracks from legal sources:
   - Spotify (requires Premium for offline downloads)
   - Apple Music
   - YouTube Music
   - Amazon Music
   - Tidal
   - Deezer
   - Or purchase from iTunes, Amazon, Google Play Music, etc.

2. **Convert to MP3** (if needed):
   - Most downloaded tracks are in MP3 or M4A format
   - If you have M4A files, you can use free converters like:
     - **Online**: CloudConvert (https://cloudconvert.com/)
     - **Desktop**: VLC Media Player, Audacity, or FFmpeg

3. **Rename the files**:
   - Rename "Heis" by Rema to: `heis-rema.mp3`
   - Rename "Mnike" by Tyler ICU to: `mnike-tyler-icu.mp3`

4. **Copy to this directory**:
   - Place both files in `frontend/assets/audio/`

### Option 2: YouTube Download (Use Responsibly)

⚠️ **Note**: Only download music you have the right to use. For educational purposes, ensure you comply with copyright laws.

1. Find the official tracks on YouTube:
   - "Heis - Rema" (Official Audio)
   - "Mnike - Tyler ICU & Uncle Waffles" (Official Audio)

2. Use a YouTube to MP3 converter:
   - Online tools: youtube-mp3.org, ytmp3.cc (check current availability)
   - Desktop: 4K YouTube to MP3, youtube-dl, yt-dlp

3. Download and rename as described above

### Option 3: Use FFmpeg (Command Line)

If you have video files or need to convert/trim audio:

```bash
# Convert to MP3
ffmpeg -i input.m4a -codec:a libmp3lame -qscale:a 2 heis-rema.mp3

# Trim to specific duration (optional - e.g., 30 seconds)
ffmpeg -i input.mp3 -ss 00:00:00 -t 00:00:30 -acodec copy output.mp3
```

## File Specifications

- **Format**: MP3 (MPEG Audio Layer 3)
- **Recommended Quality**: 192-320 kbps
- **Duration**: Full track recommended (app will play the entire song)
- **File Size**: Typically 3-8 MB per track

## Testing the Setup

1. After adding the files, refresh your browser
2. Navigate to the learning pages:
   - http://127.0.0.1:8000/pages/learning/afrobeat.html
   - http://127.0.0.1:8000/pages/learning/amapiano.html
3. Click the "Preview Track" button to test audio playback
4. Visit the "Listen & Learn" pages for full playback controls:
   - http://127.0.0.1:8000/pages/learning/listen-afrobeat.html
   - http://127.0.0.1:8000/pages/learning/listen-amapiano.html

## Troubleshooting

### Audio doesn't play

- Check that the filenames exactly match: `heis-rema.mp3` and `mnike-tyler-icu.mp3`
- Ensure files are in MP3 format (not M4A, WAV, or other formats)
- Check browser console for error messages (F12 → Console tab)
- Try clearing browser cache and reloading

### Button shows "Audio file not found"

- Verify files are in `frontend/assets/audio/` directory
- Check filename spelling and capitalization
- Ensure the server is running (`python server.py`)

### Audio is choppy or slow

- Convert to a lower bitrate (192 kbps is usually sufficient)
- Check your internet connection if streaming from a remote source

## Legal Notice

🎵 **Copyright Compliance**: The tracks "Heis" by Rema and "Mnike" by Tyler ICU & Uncle Waffles are copyrighted materials. Ensure you have the legal right to use these tracks for your educational project. Consider:

- Purchasing the tracks from legitimate sources
- Using only for personal/educational purposes
- Not redistributing the audio files
- Respecting artist and label rights

## Alternative: Use Sample Clips

If you cannot obtain the full tracks, you can use 30-second preview clips which are often available legally from:

- Spotify Web API (preview URLs)
- Apple Music API (preview URLs)
- 7digital API
- Amazon Music previews

Update the `<source>` tags in the HTML files to point to these preview URLs instead of local files.
