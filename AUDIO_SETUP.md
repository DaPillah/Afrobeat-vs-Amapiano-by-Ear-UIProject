# Audio Files Setup Guide

This guide will help you download the audio files needed for the Afrobeat vs Amapiano by Ear UI Project.

## Prerequisites

### 1. Install yt-dlp

**Windows:**

```cmd
pip install yt-dlp
```

**Mac:**

```bash
pip install yt-dlp
# or
brew install yt-dlp
```

**Linux:**

```bash
pip install yt-dlp
# or
sudo apt install yt-dlp
```

### 2. Install ffmpeg (required for audio conversion)

**Windows:**
Download from: https://ffmpeg.org/download.html

**Mac:**

```bash
brew install ffmpeg
```

**Linux:**

```bash
sudo apt install ffmpeg
```

## Download Audio Files

### Afrobeat Songs

Navigate to the afrobeat audio directory and run these commands:

```bash
cd frontend/assets/audio/afrobeat
```

**1. Commas — Ayra Starr**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "commas-ayra-starr.%(ext)s" "ytsearch1:Commas Ayra Starr official audio"
```

**2. Woman — Rema**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "woman-rema.%(ext)s" "ytsearch1:Woman Rema official audio"
```

**3. Kese — Wizkid**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "kese-wizkid.%(ext)s" "ytsearch1:Kese Wizkid official audio"
```

**4. Ifeoma — Ozedikus**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "ifeoma-ozedikus.%(ext)s" "ytsearch1:Ifeoma Ozedikus official audio"
```

**5. Holy Ghost — Omah Lay**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "holy-ghost-omah-lay.%(ext)s" "ytsearch1:Holy Ghost Omah Lay official audio"
```

### Amapiano Songs

Navigate to the amapiano audio directory and run these commands:

```bash
cd ../amapiano
```

**1. Water — Tyla**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "water-tyla.%(ext)s" "ytsearch1:Water Tyla official audio"
```

**2. Tshwala Bam — TitoM & Yuppe**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "tshwala-bam.%(ext)s" "ytsearch1:Tshwala Bam TitoM Yuppe official audio"
```

**3. Dalie — Kamo Mphela**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "dalie-kamo-mphela.%(ext)s" "ytsearch1:Dalie Kamo Mphela official audio"
```

**4. Zenzele — Uncle Waffles**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "zenzele-uncle-waffles.%(ext)s" "ytsearch1:Zenzele Uncle Waffles official audio"
```

**5. Shake Ah — Tyla & Tony Durado**

```bash
yt-dlp -x --audio-format webm --audio-quality 0 -o "shake-ah-tyla-tony-durado.%(ext)s" "ytsearch1:Shake Ah Tyla Tony Durado official audio"
```

## Quick Download All

You can download all songs at once using these commands:

### Windows (CMD)

```cmd
cd frontend\assets\audio\afrobeat
yt-dlp -x --audio-format webm --audio-quality 0 -o "commas-ayra-starr.%%(ext)s" "ytsearch1:Commas Ayra Starr official audio" && yt-dlp -x --audio-format webm --audio-quality 0 -o "woman-rema.%%(ext)s" "ytsearch1:Woman Rema official audio" && yt-dlp -x --audio-format webm --audio-quality 0 -o "kese-wizkid.%%(ext)s" "ytsearch1:Kese Wizkid official audio" && yt-dlp -x --audio-format webm --audio-quality 0 -o "ifeoma-ozedikus.%%(ext)s" "ytsearch1:Ifeoma Ozedikus official audio" && yt-dlp -x --audio-format webm --audio-quality 0 -o "holy-ghost-omah-lay.%%(ext)s" "ytsearch1:Holy Ghost Omah Lay official audio"

cd ..\amapiano
yt-dlp -x --audio-format webm --audio-quality 0 -o "water-tyla.%%(ext)s" "ytsearch1:Water Tyla official audio" && yt-dlp -x --audio-format webm --audio-quality 0 -o "tshwala-bam.%%(ext)s" "ytsearch1:Tshwala Bam TitoM Yuppe official audio" && yt-dlp -x --audio-format webm --audio-quality 0 -o "dalie-kamo-mphela.%%(ext)s" "ytsearch1:Dalie Kamo Mphela official audio" && yt-dlp -x --audio-format webm --audio-quality 0 -o "zenzele-uncle-waffles.%%(ext)s" "ytsearch1:Zenzele Uncle Waffles official audio" && yt-dlp -x --audio-format webm --audio-quality 0 -o "shake-ah-tyla-tony-durado.%%(ext)s" "ytsearch1:Shake Ah Tyla Tony Durado official audio"
```

### Mac/Linux (Bash)

```bash
cd frontend/assets/audio/afrobeat
yt-dlp -x --audio-format webm --audio-quality 0 -o "commas-ayra-starr.%(ext)s" "ytsearch1:Commas Ayra Starr official audio" && \
yt-dlp -x --audio-format webm --audio-quality 0 -o "woman-rema.%(ext)s" "ytsearch1:Woman Rema official audio" && \
yt-dlp -x --audio-format webm --audio-quality 0 -o "kese-wizkid.%(ext)s" "ytsearch1:Kese Wizkid official audio" && \
yt-dlp -x --audio-format webm --audio-quality 0 -o "ifeoma-ozedikus.%(ext)s" "ytsearch1:Ifeoma Ozedikus official audio" && \
yt-dlp -x --audio-format webm --audio-quality 0 -o "holy-ghost-omah-lay.%(ext)s" "ytsearch1:Holy Ghost Omah Lay official audio"

cd ../amapiano
yt-dlp -x --audio-format webm --audio-quality 0 -o "water-tyla.%(ext)s" "ytsearch1:Water Tyla official audio" && \
yt-dlp -x --audio-format webm --audio-quality 0 -o "tshwala-bam.%(ext)s" "ytsearch1:Tshwala Bam TitoM Yuppe official audio" && \
yt-dlp -x --audio-format webm --audio-quality 0 -o "dalie-kamo-mphela.%(ext)s" "ytsearch1:Dalie Kamo Mphela official audio" && \
yt-dlp -x --audio-format webm --audio-quality 0 -o "zenzele-uncle-waffles.%(ext)s" "ytsearch1:Zenzele Uncle Waffles official audio" && \
yt-dlp -x --audio-format webm --audio-quality 0 -o "shake-ah-tyla-tony-durado.%(ext)s" "ytsearch1:Shake Ah Tyla Tony Durado official audio"
```

## Verify Installation

After downloading, verify that all files are in place:

**Expected file structure:**

```
frontend/assets/audio/
├── heis-rema.webm (existing)
├── mnike-tyler-icu.webm (existing)
├── afrobeat/
│   ├── commas-ayra-starr.webm
│   ├── woman-rema.webm
│   ├── kese-wizkid.webm
│   ├── ifeoma-ozedikus.webm
│   └── holy-ghost-omah-lay.webm
└── amapiano/
    ├── water-tyla.webm
    ├── tshwala-bam.webm
    ├── dalie-kamo-mphela.webm
    ├── zenzele-uncle-waffles.webm
    └── shake-ah-tyla-tony-durado.webm
```

## Troubleshooting

**Issue: "yt-dlp not found"**

- Make sure you've installed yt-dlp using pip or your package manager
- Try running: `python -m pip install yt-dlp`

**Issue: "ffmpeg not found"**

- Install ffmpeg using the instructions above
- Ensure ffmpeg is in your system PATH

**Issue: Download fails**

- Check your internet connection
- Try adding `--no-check-certificate` to the yt-dlp command
- Try searching for a different version of the song

**Issue: Audio files not playing in app**

- Ensure files are in the correct directories
- Check that filenames match exactly (including extensions)
- Refresh your browser and clear cache

## Notes

- Audio quality is set to highest (0) to ensure best listening experience
- WebM format is used for better web compatibility
- The app will fall back to MP3 if WebM is not available
- If a specific song isn't found, you may need to adjust the search query or manually download and rename the file
