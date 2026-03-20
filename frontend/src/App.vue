<script setup>
import { ref } from 'vue'
import MermaidDiagram from './components/MermaidDiagram.vue'

const count = ref(0)

const architectureDiagram = `graph TD
    subgraph LOCAL["Local Machine"]
        FE_LOCAL["frontend/<br/>Vue + Vite<br/>localhost:5173"]
        BE_LOCAL["backend/<br/>Express + Prisma + OpenAI<br/>localhost:3000"]
        FE_LOCAL -->|"/api proxy"| BE_LOCAL
    end

    subgraph GITHUB["GitHub"]
        REPO["mikkelboschmidt/claudetest<br/>main branch<br/>frontend/ + backend/"]
    end

    subgraph RAILWAY["Railway"]
        subgraph SERVICES["Services"]
            FE_SVC["Frontend Service<br/>Root: frontend/<br/>Build: vite build<br/>Start: serve dist"]
            BE_SVC["Backend Service<br/>Root: backend/<br/>Build: prisma generate + migrate<br/>Start: node src/index.js"]
            PG["PostgreSQL<br/>Addon"]
        end

        FE_SVC -->|"VITE_API_URL"| BE_SVC
        BE_SVC -->|"FRONTEND_URL"| FE_SVC
        PG -->|"DATABASE_URL"| BE_SVC
        BE_SVC -->|"OPENAI_API_KEY"| OPENAI["OpenAI API"]
    end

    subgraph BROWSER["Users / Browser"]
        USER["Browser"]
    end

    LOCAL -->|"git push"| GITHUB
    GITHUB -->|"auto-deploy"| FE_SVC
    GITHUB -->|"auto-deploy"| BE_SVC
    USER -->|"loads page"| FE_SVC
    USER -->|"POST /api/ai/chat"| BE_SVC
    BE_SVC -->|"response"| USER`

const cards = [
  {
    title: 'Fast',
    description: 'Built with Vite for lightning-fast development and hot module replacement.',
    icon: '⚡'
  },
  {
    title: 'Reactive',
    description: 'Powered by Vue 3 with the Composition API for clean, reactive code.',
    icon: '🔄'
  },
  {
    title: 'Modern',
    description: 'Uses modern tooling and best practices for a great developer experience.',
    icon: '✨'
  }
]
</script>

<template>
  <div class="app">
    <header class="hero">
      <h1>Hello Mikkel</h1>
      <p class="subtitle">A simple Vue + Vite app</p>
    </header>

    <div class="cards">
      <div class="card" v-for="card in cards" :key="card.title">
        <span class="card-icon">{{ card.icon }}</span>
        <h2>{{ card.title }}</h2>
        <p>{{ card.description }}</p>
      </div>
    </div>

    <div class="card diagram-card">
      <h2>Architecture</h2>
      <MermaidDiagram :chart="architectureDiagram" />
    </div>

    <div class="card counter-card">
      <h2>Counter</h2>
      <p class="count">{{ count }}</p>
      <button @click="count++">Increment</button>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-family: system-ui, -apple-system, sans-serif;
  background: #f5f7fa;
  padding: 3rem 1.5rem;
  color: #1a1a2e;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  width: 100%;
  margin-bottom: 2rem;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06);
}

.card-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
}

.card h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.card p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

.diagram-card {
  max-width: 900px;
  width: 100%;
  margin-bottom: 2rem;
  overflow-x: auto;
}

.diagram-card h2 {
  margin-bottom: 1.5rem;
}

.counter-card {
  text-align: center;
  max-width: 300px;
  width: 100%;
}

.count {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  margin: 0.5rem 0 1rem;
}

button {
  padding: 0.7rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

button:hover {
  opacity: 0.9;
}

button:active {
  transform: scale(0.97);
}
</style>
