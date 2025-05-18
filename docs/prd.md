
Below is the revised PRD reflecting a desktop‐only Tauri application (React/TypeScript front end, Rust back end) and omitting any authentication requirements.

# 1. Document Control  
1.1. Title: Video-to-Vector Search Desktop App  
1.2. Version: 0.1.0  
1.3. Author: Patryk Sztuczka 
1.4. Date: 2025-05-18  

# 2. Purpose & Scope  
This document defines requirements for a desktop application that lets a user create named collections, ingest YouTube videos into those collections, generate LLM-based summaries of each video, store summary embeddings in a vector store, and search across all stored summaries. It targets full-stack engineers working with Tauri (React+TypeScript UI, Rust backend).

# 3. Background & Goals  
3.1. Problem Statement  
Users must manually watch, transcribe and sift through long videos to find key insights. A lightweight desktop client that automates download, transcription, summarization and search solves this.  
3.2. Goals  
1. Allow users to define one or more local “collections” of videos.  
2. For each video: download from YouTube, transcribe, summarize via LLM, embed summary, persist locally.  
3. Provide an instant, relevance-ranked search over all stored embeddings.  
3.3. Success Metrics  
1. End-to-end video-to-summary completed in no more than twice the video length.  
2. Local search queries return results under 200 ms.

# 4. User Personas  
4.1. Individual Researcher needing rapid summaries of recorded lectures for offline review.  
4.2. Content Curator building local libraries of tutorial videos and searching by topic.  
4.3. Developer troubleshooting code walkthroughs within downloaded recordings.

# 5. User Journeys & Stories  
5.1. Collection Creation  
   User opens the app, clicks “New Collection,” enters a name and optional description, sees the empty collection panel.  
5.2. Video Ingestion & Summary  
   Within a collection, user clicks “Add Video,” pastes a YouTube URL. The UI shows a status spinner progressing through “Downloading → Transcribing → Summarizing → Complete.” Upon completion, the summary text appears alongside a “View Transcript” button.  
5.3. Search Across Summaries  
   User enters free-text into a global search field or filters by collection. The app instantly returns ranked summary cards (title, snippet, timestamp suggestions).

# 6. Functional Requirements  
6.1. Collections  
   The user can create, rename, delete and list collections. All data persists locally.  
6.2. Video Ingestion  
   Upon URL submission, the Rust backend invokes a downloader (e.g. youtube-dl). Invalid URLs produce an error message.  
6.3. Transcription  
   Rust worker calls Whisper bindings (locally linked or external API) to produce a full-text transcript and time-coded SRT file.  
6.4. Summarization  
   Rust code sends the transcript to an LLM service (e.g. OpenAI GPT-4 via REST) using a fixed prompt template to obtain a structured, detailed summary.  
6.5. Embedding & Storage  
   Rust module computes an embedding of the summary (e.g. OpenAI embeddings or a local model), writes the vector plus metadata to a local vector database (e.g. embedded Qdrant or SQLite+FAISS).  
6.6. Search  
   On user query, the frontend requests Rust to embed the query text, performs a k-NN search in the local vector store, and returns top results with relevance scores.  
6.7. UI Display  
   React views must show video thumbnail, title, status badge, summary text, link to full transcript, and search filters.

# 7. Non-Functional Requirements  
7.1. Performance  
   Support concurrent processing of at least two videos without UI freeze.  
7.2. Scalability  
   Architect the Rust backend so that transcription and summarization workers can be sharded across CPU cores.  
7.3. Reliability  
   Recover gracefully from failures (e.g. downloader error) and allow retry.  
7.4. Security  
   Store all artifacts (videos, transcripts, embeddings) only in the user’s local filesystem; do not transmit sensitive data elsewhere.

# 8. System Architecture Overview  
8.1. Components  
   The Tauri shell hosts a React/TypeScript frontend and invokes Rust commands (IPC) for backend tasks.  
   Local storage uses the user’s AppData/Roaming folder (Windows) or ~/.local/share (Linux/macOS) for videos, transcripts and the vector store.  
8.2. Data Flow  
   1. Frontend → Rust “add_video” command → download → whisper → LLM → embed → vector store → status update → frontend.  
   2. Search: Frontend → Rust “search” command → embed query → vector store → results → frontend.

# 9. Data Model  
9.1. Table: Collection (id: UUID, name: text, description: text, created_at: timestamp)  
9.2. Table: Video (id: UUID, collection_id: UUID, youtube_url: text, status: enum, transcript_path: text, summary_text: text, created_at: timestamp)  
9.3. Table: Embedding (video_id: UUID, vector: blob, created_at: timestamp)

# 10. Tauri IPC Commands  
10.1. create_collection({ name, description }) → { id, name, description }  
10.2. list_collections() → [{ id, name, description }]  
10.3. delete_collection({ id }) → success  
10.4. add_video({ collection_id, youtube_url }) → { video_id, status }  
10.5. get_video_status({ video_id }) → { status, transcript_path?, summary_text? }  
10.6. search({ query, collection_id? }) → [{ video_id, score, snippet, timestamp }]

# 11. UX & Wireframes  
11.1. Main Window  
   Sidebar: list of collections with “+ New” button.  
   Primary pane: either collection detail (video cards) or search results.  
11.2. Collection Detail  
   Toolbar: “Add Video” input, status legend.  
   Grid of video cards showing thumbnail, title, status badge.  
11.3. Video Detail Modal  
   Video player embed, full transcript download, summary text panel.  
11.4. Search Bar & Results  
   Persistent top bar for global query, dropdown to filter by collection, list of result cards.

# 12. Acceptance Criteria  
12.1. Given a valid YouTube URL, the desktop client completes download, transcription, summarization and embedding, and displays the summary.  
12.2. Search returns relevant summary cards ranked by vector similarity in under 200 ms on typical modern hardware.  
12.3. Collections and video metadata persist across app restarts.  
12.4. Errors in any backend step surface clearly in the UI with retry options.

# 13. Dependencies & Constraints  
13.1. youtube-dl (or yt-dl-rust crate) and FFmpeg installed or bundled.  
13.2. Whisper bindings for Rust (e.g. `whisper-rs`).  
13.3. Access to an LLM service (OpenAI API key).  
13.4. Local vector store dependency (Qdrant embedded, SQLite + FAISS).  

# 14. Risks & Mitigations  
14.1. Risk: YouTube changes break downloader. Mitigation: bundle a pinned version and monitor upstream.  
14.2. Risk: Large videos exhaust local storage. Mitigation: allow user to configure storage path and auto-cleanup old artifacts.  

---  
This aligns end-to-end on Tauri, React/TypeScript front end, Rust back end, and excludes any authentication components you did not request. Let me know if you’d like further refinement.
