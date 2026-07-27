# Auditoria de posicionamento e marca pessoal — Julho 2026

> **Status:** base de consulta para reposicionamento do ecossistema (site · CV · GitHub · LinkedIn).  
> **Data:** 2026-07-26  
> **Fontes:** site [kleilson-portfolio.pages.dev](https://kleilson-portfolio.pages.dev), conteúdo canônico `apps/web/content/*.json` (`main` + branch local), CV `Kleilson_Santos_CV_2026.docx`, GitHub [`KleilsonSantos`](https://github.com/KleilsonSantos) (bio + profile README), LinkedIn (não scrapeável — risco estimado).  
> **Posicionamento-alvo declarado pelo autor:** Senior Full Stack Software Engineer (ênfase Backend) — Arquitetura Moderna, Cloud, DevSecOps, Observabilidade, Engenharia de Software e **AI Applied Engineering** (IA como acelerador, não identidade central).

---

## Resumo executivo

| Canal | Identidade que transmite hoje | Alinhamento com o CV |
| --- | --- | --- |
| **CV (fonte forte)** | Senior Backend / Full Stack Java · Spring · Kafka · AppSec · Banking | Referência |
| **Portfólio (live `main`)** | Construtor de **governança de IA (AIOS/Companion)** | **Invertido** |
| **GitHub bio + README** | Senior Backend Java + banking + Agentic AI no fim | Parcialmente ok |
| **LinkedIn** | Não auditável aqui (login wall) | Assumir risco alto de drift |

**Veredito:** o CV posiciona corretamente um **Software Engineer de sistemas críticos financeiros**. O site (após AIOS como destaque primário) posiciona um **product owner de plataforma de IA**. Recrutador técnico de banco/fintech **não** lê isso como o mesmo profissional.

A IA no CV aparece como **habilitador** (Copilot, SDD, n8n, AI-900) no final do headline e numa seção própria. No site, AIOS/Companion ocupam **H1, primeiros destaques e projeto #1**.

**Nota geral do ecossistema hoje: 5.2 / 10** (CV puxa para cima; site puxa para baixo no posicionamento desejado).

### Gap crítico CV ↔ Site ↔ GitHub

| Artefato no CV | No portfólio? |
| --- | --- |
| **purchase-ecosystem** (4 MS, Saga, GitOps, SDD) — **projeto #1 do CV** | **Ausente / não destacado** |
| banking | Featured, mas não primário |
| VaultSpring, infra-devtools | Presentes |
| **AIOS / Companion** | **Primários no site** |
| AIOS / Companion no CV | **Não listados** |

Isso não é nuance: é **inconsistência de marca**. Ou AIOS entra no CV como *side product / AI Applied*, ou some do topo do site.

> **Atenção:** PR de aprofundamento da narrativa AIOS (#165 / branch `feature/enrich-aios-companion-narrative`) **piora** o viés AI-first se mergeado **sem** reordenar featured/headline. Congelar até P0 de reposicionamento.

---

## 1. Primeira impressão (5 segundos) — site

**Fatos (conteúdo canônico em `main`):**

- `title`: `Software Engineer | Full Stack Developer`
- `h1` (headline): *“…governança de IA no SDLC — control plane (AIOS)… Companion”*
- Destaque primário em `/projetos`: **AI Operating System (AIOS)**
- Meta hero: localização + remoto + **Azure AI-900** (única certificação na linha)

**Quem aparenta ser?**  
Engenheiro que **constrói sistema operacional / governança de IA**, com background financeiro no corpo — não no primeiro sinal.

**O que o recrutador entende?**  
“AI platform / agentic tooling guy.” Full Stack bancário só aparece se rolar.

**Mensagem clara?** Clara, mas **errada** vs CV e vs o posicionamento-alvo.

**Excesso de IA?** Sim — estrutural (hierarquia visual + ordem de projetos + destaques).

**Perda da identidade Full Stack?** Sim no hero. O título Full Stack é demovido a `hero__lead`; o H1 vende AIOS.

| Critério | Nota |
| --- | ---: |
| Clareza (qualquer mensagem) | 8 |
| Clareza **correta** (SWE Full Stack + AI applied) | 3 |
| **Primeira impressão (ajuste ao target)** | **3.5 / 10** |

---

## 2. Clareza do posicionamento

### O que o CV comunica (correto)

> Software Engineer \| Senior Backend / Full Stack (Java, Spring Boot, Kafka) \| AppSec & DevSecOps \| Banking \| **Agentic AI · GitHub Copilot** (no fim)

Resumo CV: ênfase em Capgemini, banking, Kafka, hexagonal, Saga/DLQ, Mend/Fortify, JaCoCo — AI Agentic/SDD como prática, não produto.

### Matriz alvo × canais

| Alvo desejado | Site hoje | CV |
| --- | --- | --- |
| Senior Software Engineer | Fraco (title genérico) | Forte |
| Full Stack | Médio (title) | Forte (“ênfase backend”) |
| Backend Specialist | Escondido no hero | **Primário** |
| Cloud / DevSecOps | Skills + projetos secundários | Forte na experiência |
| AI Applied Engineer | **Dominante** | Secundário |
| AI Engineer / Prompt Specialist | Risco alto no site | Baixo no CV |

**Por quê o site parece “AI Engineer”:** ordem de leitura = H1 AIOS → destaques AIOS/Companion → featured AIOS. Em recrutamento, **ordem = prioridade de carreira**.

**Nota posicionamento: 4 / 10** (CV 8; site 3; média ponderada pela home pública).

---

## 3. Hero Section

| Elemento | Estado | Problema |
| --- | --- | --- |
| Headline (H1) | AIOS/Companion | Deveria espelhar o **headline do CV** |
| Subheadline (`title`) | Full Stack genérico | Ok, mas perde para o H1 |
| CTA | Projetos / Contato | Ok; falta “Experiência” ou PDF CV |
| Badges / tech strip | Ausente no hero | Recrutador não vê Java/Kafka em 5s |
| Certificação na meta | Só AI-900 | Reforça viés AI; Cloud/AppSec sem badge |
| Hierarquia | Nome → **tese AI** → title | Invertida |

**A hero vende o perfil corretamente?** Não.

### Mudança mínima de alto impacto (copy canônica)

```text
H1: Software Engineer | Senior Backend / Full Stack — Java, Spring Boot, Kafka
Lead: Microsserviços, AppSec e DevSecOps em financial services · AI Applied Engineering como acelerador
Meta: Capgemini · Banking · Remoto · 9+ anos
Chips: Java 21 · Spring · Kafka · K8s · React/Angular · AppSec
CTA: Ver experiência | Projetos | Contato | Baixar CV
```

**Nota hero: 3 / 10**

---

## 4. Narrativa profissional

### Progressão desejada

```text
Software Engineering → Arquitetura → Cloud/DevSecOps → AI Applied (acelerador)
```

### Progressão do CV

Correta: banking full stack → AppSec squad → métricas de API/Kafka/Docker → Copilot/SDD no fim das bullets.

### Progressão do site

**Invertida:** AIOS primeiro → depois AppSec/APIs nos highlights → banking como featured #3.

**Nota narrativa: 4 / 10**

---

## 5. Experiência técnica (evidência)

| Área | CV | Site (home/projetos) | Supervalorizada? | Escondida? |
| --- | --- | --- | --- | --- |
| Backend Java/Spring | Excelente | Bom no texto longo | — | No hero |
| Kafka / Saga / DLQ | Excelente | Fraco no topo | — | Sim |
| Frontend Angular/React | Bom | Skills ok | — | Sim |
| Cloud | Médio (AI-900, AWS básico) | Fraco | — | Sim |
| DevSecOps / AppSec | Excelente | Médio (highlights) | — | Relativo |
| Observabilidade | Bom (purchase/banking) | banking tagline | — | Parcial |
| Testes / qualidade | Excelente | Highlights | — | — |
| CI/CD / GitOps | Excelente | Médio | — | — |
| AI aplicada (Copilot/SDD) | Bom, calibrado | — | — | — |
| AI **produto** (AIOS) | **Não no CV** | **Dominante** | **Sim** | — |

**Nota evidência técnica: 7 / 10** (o stack existe; a **vitrine** distorce).

---

## 6. Projetos

### Critérios por projeto (site + CV)

| Projeto | Problema claro? | Arquitetura? | Impacto? | Senioridade? | Deveria |
| --- | --- | --- | --- | --- | --- |
| **purchase-ecosystem** (CV) | Sim (MS event-driven) | Forte | Médio-alto | Alta | **#1 site** |
| **banking** | Médio | Médio | Médio | Alta (plataforma) | Featured alto |
| **infra-devtools** | Sim (DevSecOps local) | Baixa | Operacional | Média | Featured |
| **VaultSpring** | Sim (secrets) | Média | AppSec | Média-alta | Featured |
| **AIOS** | Sim (governança IA) | Alta | Produto open source | Alta em *platform design* | Featured **secundário** (“AI Applied”) |
| **Companion** | Sim (UX sobre control plane) | Alta (fronteira) | Complementar | Média-alta | Junto ao AIOS, não #1 |
| Mongo-RestFull-API | Básico | Baixa | Baixo | Júnior-pleno | Demote |
| OrderProcessingSystem | Médio | Médio | Médio | Médio | Lista |
| appsec-daily-hub | Conteúdo | Baixa | Baixo | Fraco como “engenharia” | Lista / About |
| ai-driven | Toolkit | Baixa | Baixo | Fraco | Lista ou arquivar |

**Quem deveria ganhar destaque:** purchase-ecosystem → banking → VaultSpring / infra-devtools → **depois** AIOS/Companion como *AI Applied Engineering*.

**Quem deveria perder:** AIOS/Companion como primários; demos Node/hub como “prova de senioridade”.

**Nota projetos (curadoria): 4.5 / 10**

---

## 7. GitHub

**Fatos:**

- Bio: *Senior Backend Engineer | Java · Spring · Kafka | … | Agentic AI · Copilot* — hierarquia melhor que o site.
- README profile: *Senior Java Backend Engineer*, banking Bradesco/BB, tabela de projetos **sem AIOS/Companion** (ainda com `ai-driven`).
- Atividade recente: AIOS, Companion, portfolio, VaultSpring — sinal de “agora sou AIOS” no feed.
- 43 repos públicos, poucos stars; banking split em vários repos — bom para profundidade, ruim para “um olhar”.

**Reforça ou contradiz o portfólio?**  
Bio/README **contradizem o hero do site** e **alinham ao CV**. O feed recente **alinha ao site AI-first**.

| Dimensão | Nota |
| --- | ---: |
| Marca | 6 / 10 |
| Engenharia / disciplina (fluxo, ADRs, monorepos) | 7.5 / 10 |

---

## 8. LinkedIn

**Limitação:** scrape público bloqueado. Avaliação = **risco**, não auditoria completa.

**Checklist a validar no perfil:**

- [ ] Headline = **CV**, não H1 do site
- [ ] Featured: banking / purchase-ecosystem / portfolio — **não** só AIOS
- [ ] About: backend banking primeiro; AI applied no **último** parágrafo
- [ ] Skills: Java/Spring/Kafka/AppSec acima de “Prompt Engineering”

Se LinkedIn = site atual → **três personas**. Se LinkedIn = CV → canal mais saudável.

**Nota estimada de alinhamento CV: 5–7 (incerto).**

---

## 9. Consistência da marca pessoal

| Canal | Persona |
| --- | --- |
| CV | Banking Backend/Full Stack + AppSec + AI as tool |
| Site | AI governance platform architect |
| GitHub README | Java Backend Capgemini |
| GitHub activity | AIOS builder |

**Parecem três profissionais?** Sim: **CV/README** vs **site/AIOS activity**.

**Nota consistência: 3.5 / 10**

---

## 10. Recrutamento (persona)

| Papel | Chamaria? | Para quê? |
| --- | --- | --- |
| Tech Recruiter (banco/fintech) | Sim **se ler o CV**; hesitaria **só pelo site** | Full Stack / Backend Java |
| Staff / EM | Sim com CV + purchase/banking | Senior Backend / Full Stack |
| CTO produto AI | Talvez (AIOS) | Papel errado para o alvo declarado |
| Cloud-only / SRE | Talvez fraco | Falta narrativa cloud forte |

**Cargos alinhados ao CV:** Senior Software Engineer, Senior Backend, Full Stack (ênfase backend), AppSec-aware engineer em squad.

**Staff / Tech Lead:** possível com narrativa de mentoria + ADRs + multi-squad AppSec — ainda pouco explícito no site.

**AI Engineer dedicado:** o site **sim**; o CV **não** — não aceitar esse frame se não for o alvo.

**Nota empregabilidade no alvo declarado: 6.5 / 10**

---

## 11. Mercado (Nubank, iFood, Mercado Livre, Itaú, PicPay, Stone, Hotmart, Microsoft, AWS, Google, Thoughtworks)

Padrão desses players: **impacto em sistemas de produção + stack clara + métricas de negócio/engenharia**; AI como alavanca, não identidade.

- CV **se aproxima** (Kafka, hexagonal, AppSec, métricas — defendíveis em entrevista).
- Site **se afasta** (produto AI open source no topo).

**Falta vs esse padrão:**

1. Caso de negócio banking no hero  
2. Diagrama/arquitetura de 1–2 sistemas  
3. purchase-ecosystem como case study  
4. Cloud depth além AI-900  
5. Remoção de “Agentic AI” do **primeiro** segmento de todos os headlines  

**Nota aderência mercado alvo: 5.5 / 10**

---

## 12. Problemas encontrados

### Críticos

1. **Hero/H1 e featured #1 = AIOS** vs CV **sem AIOS** e com **purchase-ecosystem #1**.
2. **Três personas** (CV ≠ site ≠ activity GitHub).
3. **Hierarquia de marca invertida** (AI produto > engenharia de software).
4. **purchase-ecosystem ausente/subrepresentado** na vitrine principal.

### Altos

5. Destaques 1–2 (ou 1–3) = AIOS/Companion antes de Mend/APIs/GitOps.  
6. Certificação AI-900 como **único** badge no hero.  
7. Grupo de skills “AI Engineering” com AIOS no topo da percepção.  
8. Sem rota `/experiencia` dedicada — recruiter quer timeline óbvia.  
9. Aprofundar narrativa AIOS (#165) **sem** reordenar featured/headline piora o posicionamento.

### Médios

10. Title genérico “Full Stack Developer” sem “Senior Backend”.  
11. Projetos júnior na mesma página sem separação “Core vs Labs”.  
12. LinkedIn não verificado; risco de drift.  
13. Métricas do CV (30%/40%) no site pouco usadas — usar só se auditáveis.

### Baixos

14. Profile README ainda lista `ai-driven` e não AIOS — inconsistência menor.  
15. Poucos stars/followers — cosmético.  
16. GIF/typing SVG no README — ruído visual vs empresas enterprise.

---

## 13. Plano de melhoria

### Curto prazo (1–2 semanas) — maior ROI · **P0**

1. [x] Reescrever headline/title do site **igual ao CV** (AI no fim).  
2. [x] Featured order: **banking** (público) → VaultSpring → infra → AIOS/Companion fora do hero. *Nota: `purchase-ecosystem` não é repo público único (MS privados) — citado em highlights, sem link 404.*  
3. [x] Highlights: AppSec/APIs/GitOps **antes** de qualquer AIOS.  
4. [x] AIOS/Companion: tag **“AI Applied”**, `featured: false`.  
5. [ ] Alinhar CV: 1 bullet AIOS opcional.  
6. [ ] GitHub bio = CV headline; pinned repos.  
7. [ ] LinkedIn headline/About/Featured = CV.  
8. [x] Congelar/supersede merge de narrativa AIOS-deep (#165) — substituído por este reposicionamento.

### Médio prazo (1–2 meses) · **P1**

9. Case study pages: purchase-ecosystem + banking (arquitetura, ADRs, observabilidade).  
10. Página Experiência com timeline Capgemini.  
11. Download CV + JSON-LD `jobTitle` alinhado.  
12. Separar “Produção / Plataforma” vs “Labs / AI Applied”.

### Longo prazo · **P2**

13. Cloud cert (além AI-900) se mirar cloud-heavy.  
14. 1–2 contribuições públicas em Java/Spring relevantes.  
15. Conteúdo LinkedIn: AppSec/Kafka/GitOps 80% · AI applied 20%.

---

## 14. Reposicionamento sugerido

### Headline canônico (todos os canais)

> Senior Full Stack Software Engineer (ênfase Backend) — Arquitetura Moderna, Microsserviços Java/Spring/Kafka, DevSecOps/AppSec em Financial Services. **AI Applied Engineering** como acelerador de produtividade e qualidade.

### Sobre (último parágrafo só)

> Uso IA de forma aplicada (Copilot, SDD, automações) e mantenho open source em governança de agentes no SDLC (AIOS/Companion) como **extensão** da disciplina de engenharia — não como eixo exclusivo da carreira.

### Title curto

```text
Software Engineer | Senior Backend / Full Stack | AppSec · Banking
```

### Ordem canônica de featured (site)

1. `purchase-ecosystem` (primário)  
2. `banking`  
3. `VaultSpring` e/ou `infra-devtools`  
4. `ai-operating-system` + `aios-companion` (AI Applied — não hero)

---

## Tabela consolidada de notas

| Categoria | Nota Atual | Nota Esperada | Prioridade |
| --- | ---: | ---: | ---: |
| Primeira impressão (site) | 3.5 | 8.5 | P0 |
| Clareza posicionamento | 4.0 | 9.0 | P0 |
| Hero | 3.0 | 8.5 | P0 |
| Narrativa (progressão) | 4.0 | 8.5 | P0 |
| Evidência técnica (fundo) | 7.0 | 8.5 | P2 |
| Curadoria de projetos | 4.5 | 9.0 | P0 |
| GitHub (marca) | 6.0 | 8.5 | P1 |
| LinkedIn (estimado) | 5.0* | 9.0 | P1 |
| Consistência 3 canais + CV | 3.5 | 9.0 | P0 |
| Empregabilidade no alvo | 6.5 | 9.0 | P0 |
| Aderência mercado fintech/banco | 5.5 | 8.5 | P1 |
| **Média ponderada** | **~5.2** | **~8.7** | — |

\*LinkedIn não auditado de ponta a ponta.

---

## 10 mudanças de maior impacto (checklist de execução)

- [x] **1.** Trocar o H1 do site pelo headline do CV (AI no final).  
- [x] **2.** Destaque primário público: **banking** (purchase multi-repo privado → highlight sem URL morta).  
- [x] **3.** Rebaixar AIOS/Companion (`featured: false`, label AI Applied).  
- [x] **4.** Reordenar highlights: Mend/APIs/JaCoCo/GitOps → Copilot/SDD → AIOS.  
- [ ] **5.** Uma linha de AIOS no CV *ou* manter só no site como lab.  
- [ ] **6.** Pinned repos + bio GitHub = CV.  
- [ ] **7.** LinkedIn = CV (headline, about, featured).  
- [ ] **8.** Chips de stack no hero (Java, Spring, Kafka…) — pendente UI.  
- [ ] **9.** CTA “Baixar CV” + página de experiência explícita.  
- [x] **10.** Supersede #165 (narrativa AIOS-deep) pelo reposicionamento SWE-first.

---

## Conclusão

O CV `Kleilson_Santos_CV_2026.docx` é a **melhor versão no mercado**. O portfólio público, depois de promover AIOS/Companion, **contradiz** esse CV e o posicionamento declarado (Full Stack + AI Applied, não AI Engineer).

Não é falta de competência: é **falha de arquitetura de informação e de branding**. Corrigir hierarquia (texto + ordem de projetos + consistência CV/GitHub/LinkedIn) recupera a maior parte da nota sem reescrever a carreira.

---

## Próximo passo sugerido (implementação)

Issue/PR de reposicionamento P0 no monorepo `kleilson-portfolio`:

1. `apps/web/content/profile.json` — headline, title, summary, highlights, skills  
2. `apps/web/content/projects.json` — incluir/featured `purchase-ecosystem`; reordenar featured  
3. Hero UI (opcional) — chips de stack + CTA CV  
4. `CHANGELOG.md` `[Unreleased]`  
5. Alinhar CV (1 bullet AIOS) e profile README GitHub em PRs/repos separados  

**Referência deste documento:** `docs/audits/personal-branding-positioning-audit-2026-07.md`
