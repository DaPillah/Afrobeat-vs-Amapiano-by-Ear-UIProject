# Afrobeat Audio Files

Place the following audio files in this directory:

## Required Files (webm or mp3 format):

1. `commas-ayra-starr.webm` - Commas by Ayra Starr
2. `woman-rema.webm` - Woman by Rema
3. `kese-wizkid.webm` - Kese by Wizkid
4. `ifeoma-ozedikus.webm` - Ifeoma by Ozedikus
5. `holy-ghost-omah-lay.webm` - Holy Ghost by Omah Lay

## How to obtain audio files:

You can use yt-dlp to download these songs:

```bash
# Commas — Ayra Starr
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "commas-ayra-starr.%(ext)s" \
  "ytsearch1:Commas Ayra Starr official audio"

# Woman — Rema
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "woman-rema.%(ext)s" \
  "ytsearch1:Woman Rema official audio"

# Kese — Wizkid
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "kese-wizkid.%(ext)s" \
  "ytsearch1:Kese Wizkid official audio"

# Ifeoma — Ozedikus
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "ifeoma-ozedikus.%(ext)s" \
  "ytsearch1:Ifeoma Ozedikus official audio"

# Holy Ghost — Omah Lay
yt-dlp -x --audio-format webm --audio-quality 0 \
  -o "holy-ghost-omah-lay.%(ext)s" \
  "ytsearch1:Holy Ghost Omah Lay official audio"
```

Note: Install yt-dlp with `pip install yt-dlp` if not already installed.
