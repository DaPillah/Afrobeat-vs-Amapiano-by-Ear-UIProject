# Amapiano Audio Files

Place the following audio files in this directory:

## Required Files (webm or mp3 format):

1. `water-tyla.webm` - Water by Tyla
2. `tshwala-bam.webm` - Tshwala Bam by TitoM & Yuppe
3. `dalie-kamo-mphela.webm` - Dalie by Kamo Mphela
4. `zenzele-uncle-waffles.webm` - Zenzele by Uncle Waffles
5. `shake-ah-tyla-tony-durado.webm` - Shake Ah by Tyla & Tony Durado

## How to obtain audio files:

You can use yt-dlp to download these songs:

```bash
# Water — Tyla
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "water-tyla.%(ext)s" \
  "ytsearch1:Water Tyla official audio"

# Tshwala Bam — TitoM & Yuppe
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "tshwala-bam.%(ext)s" \
  "ytsearch1:Tshwala Bam TitoM Yuppe official audio"

# Dalie — Kamo Mphela
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "dalie-kamo-mphela.%(ext)s" \
  "ytsearch1:Dalie Kamo Mphela official audio"

# Zenzele — Uncle Waffles
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "zenzele-uncle-waffles.%(ext)s" \
  "ytsearch1:Zenzele Uncle Waffles official audio"

# Shake Ah — Tyla & Tony Durado
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "shake-ah-tyla-tony-durado.%(ext)s" \
  "ytsearch1:Shake Ah Tyla Tony Durado official audio"
```

Note: Install yt-dlp with `pip install yt-dlp` if not already installed.
