# Preparação seletiva — Betha | Desenvolvedor SR (Produto)

> **Base de consulta** para entrevista com recrutadora → técnica.  
> **Gerado em:** 2026-07-26  
> **Vaga oficial:** [InHire Betha — DESENVOLVEDOR SR](https://betha.inhire.app/vagas/8869d554-9b65-48ff-973d-3d72007b1050/desenvolvedor-sr) (`jobId` `8869d554-9b65-48ff-973d-3d72007b1050`)  
> **Fonte da vaga:** API pública InHire (`X-Tenant: betha`) — **não** espelho VAGAS.SC (lá aparece BU Saúde; a vaga do UUID é **área de Produto**).  
> **Perfil cruzado:** CV `Kleilson_Santos_CV_2026.docx`, portfólio, GitHub, auditoria [`personal-branding-positioning-audit-2026-07.md`](./personal-branding-positioning-audit-2026-07.md).

---

## Resumo executivo

| Item | Avaliação |
| --- | --- |
| Empresa | Betha Sistemas — plataforma digital de **gestão pública** (~40 anos), cultura “Betther”, GPTW |
| Cargo | **Desenvolvedor Sênior — área de Produto** |
| Modelo | **Remote** · contrato **CLT** · localização BR |
| Perfil implícito | Sr IC com **referência técnica** (quase Staff light): lidera tecnicamente, revisa arquitetura, orienta time, decide com produto/arquitetos; usa **IA como acelerador** e incorpora recursos de IA no produto |
| Match técnico (CV) | **Forte** em Java/Spring, microsserviços, event-driven, AppSec, testes, Docker/K8s/CI/CD, observabilidade, full stack |
| Gaps principais | **AWS profundo + serverless**, **CQRS** explícito, **Big Data / larga escala**, **mobile nativo**, domínio **gestão pública**; site hoje **AIOS-first** (risco de leitura errada) |
| Nota geral de aderência | **7.4 / 10** |
| Probabilidade de aprovação (condicional) | **55–70%** se pitch CV-first + honestidade nos gaps; **35–50%** se hero/portfólio AI-first dominar a conversa |

**Leitura crítica:** a vaga **quer** “Engenharia de Software Assistida por IA / LLMs” — isso **ajuda** você, desde que posicionado como no CV (**acelerador**), não como “AI Engineer que faz OS de agentes”. Betha é produto de **gestão pública**, não lab de AI.

---

## Etapa 1 — Análise da vaga

### 1.1 Fatos extraídos (explícitos)

| Campo | Valor |
| --- | --- |
| `displayName` | DESENVOLVEDOR SR |
| Área | **Produto** |
| `workplaceType` | Remote |
| `contractType` | CLT |
| Campos do formulário | LinkedIn, salary, curriculum |
| Última publicação | 2026-07-13 |

**Desafio (texto da vaga):** desenvolver software com valor ao cliente; escalabilidade, resiliência, segurança; custo-benefício; qualidade; estratégia; **IA para produtividade** + **recursos baseados em IA** nas soluções.

#### Responsabilidades

1. Liderar tecnicamente soluções críticas  
2. Aplicar IA e automação (produtividade, erros, inovação)  
3. Revisar arquiteturas (escalabilidade/resiliência)  
4. Ser referência técnica (devs/analistas)  
5. Colaborar com arquitetos (integração, segurança, performance)  
6. Supervisionar integração entre módulos  
7. Orientar boas práticas e ágeis  
8. Apoiar decisões estratégicas tech/produto  
9. Documentação de alto nível e guidelines  
10. Revisões de portfólio de sistemas  

#### Requisitos (lista oficial)

1. Superior/técnico em TI ou correlatas  
2. **Java 8/11/17 e/ou 21**, JS, TS + frameworks backend/frontend modernos  
3. Engenharia de Software Assistida por IA + integração com LLMs  
4. Lógica, resolução de problemas, boas práticas  
5. Versionamento + Scrum/Kanban  
6. Segurança da informação, qualidade, frameworks de testes  
7. Arquitetura: **DDD, Microservices, Event Driven, CQRS, Clean Architecture**  
8. Web, **mobile** e APIs REST  
9. Integração de sistemas e **mensageria**  
10. BD relacional e NoSQL  
11. Docker, Kubernetes, CI/CD  
12. **AWS** e **serverless**  
13. Monitoramento, observabilidade, performance  
14. **Big Data** e processamento em larga escala  

#### Cultura / employer brand (explícito)

- Gestão pública / impacto social  
- Inovação, criatividade, excelência  
- Desenvolvimento contínuo  
- Remuneração competitiva + benefícios amplos (CAJU, Unimed, PPR, GPTW 14 anos)  
- Identidade “Betther”

### 1.2 Inferências (marcar como inferência)

| Inferência | Por quê |
| --- | --- |
| Senioridade = Sr IC + **influência técnica** (não necessariamente gente-manager) | Responsabilidades de referência, guidelines, portfólio — sem “gestão de pessoas” explícita |
| Stack provavelmente Java + front moderno + AWS | Betha publicamente usa Java/Angular/AWS/Kafka em times de plataforma (evidência de mercado / perfis públicos — **validar na entrevista**) |
| IA = Copilot/LLM no dia a dia **e** features de produto | Texto cita produtividade **e** “recursos baseados em IA nas soluções” |
| CQRS / serverless / Big Data podem ser “desejável forte” vs uso diário | Empacotados na mesma lista sem “obrigatório/desejável” — típico de JD amplo |
| Domínio de negócio = produto SaaS B2G (municípios) | Empresa; **não** exige experiência prévia em governo no texto |

### 1.3 Perfil implícito que a empresa procura

> Desenvolvedor sênior de **produto**, capaz de **carregar complexidade** (integrações, resiliência), **elevar o time** (padrões, reviews, docs) e **usar IA com maturidade**, em ambiente remoto CLT, alinhado a impacto em gestão pública.

**Não procura (implícito):** especialista exclusivo em ML/treino de modelos; júnior full stack genérico; “prompt engineer” sem backend sólido.

---

## Etapa 2 — Match com o perfil

**Legenda:** Excelente · Boa · Parcial · Baixa · Não identificado

| Requisito | Evidência no perfil | Nível | Observações |
| --- | --- | ---: | --- |
| Formação TI | Técnico Informática; Licenciatura trancada (CV) | Parcial | Técnico completo ok; superior incompleto — **não inventar**; enquadrar como técnico + 9+ anos |
| Java 8–21 | Java 21, Spring Boot 4.x, migração 2→3→4 (CV) | Excelente | Citar versões e migração sem downtime |
| JS / TS | Angular, React, TypeScript (CV + portfolio) | Boa | Ênfase backend; front sólido, não “UI specialist” |
| Frameworks backend/frontend | Spring, Angular/React (CV) | Boa | Spring = forte; front moderno demonstrável |
| AI-assisted + LLMs | Copilot Agent/Chat, SDD, 10 agentes, n8n, AI-900; AIOS open source | Boa | **Calibrar:** produtividade/engenharia primeiro; AIOS como side/open source |
| Boas práticas / resolução problemas | Hexagonal, SOLID, Conventional Commits, ADRs | Excelente | |
| Git + Scrum/Kanban | Capgemini + fluxo feature→sandbox→main | Excelente | |
| Segurança + qualidade + testes | Mend/Fortify/Sonar/OWASP; JaCoCo ≥80%; JUnit/Testcontainers | Excelente | Diferencial forte vs JD genérico |
| DDD | Mencionado CV/práticas | Parcial | Conceitos; **preparar exemplo bounded context** sem overclaim |
| Microservices | Capgemini + purchase-ecosystem / banking | Excelente | |
| Event Driven | Kafka, Saga, DLQ, idempotência | Excelente | |
| CQRS | Não explícito no CV/projetos | Baixa | Estudar e relacionar a read/write paths se houver |
| Clean / Hexagonal | Hexagonal Ports & Adapters (CV) | Boa–Excelente | Mapear Clean ↔ Hexagonal na fala |
| Web + APIs REST | 20+ APIs; Angular/React | Excelente | |
| Mobile | Renegociação mobile (Full Stack) — stack não detalhada como nativo | Parcial | Falar API/jornada; **não** vender Android/iOS nativo sem evidência |
| Mensageria / integração | Kafka, Saga, sistemas bancários | Excelente | |
| SQL + NoSQL | PostgreSQL, MongoDB, Redis, MySQL | Excelente | |
| Docker / K8s / CI/CD | Docker, k3d, Helm, ArgoCD, GHA, Jenkins | Excelente | GitOps = ponto alto |
| AWS + serverless | AWS S3/EC2/IAM (CV); serverless **não** demonstrado | Parcial / Baixa | Gap #1 — estudar Lambda/API GW/SQS e mapear analogias Kafka/containers |
| Observabilidade / performance | Prometheus, Grafana, Actuator, Micrometer | Boa–Excelente | |
| Big Data / larga escala | Volume bancário possível; “Big Data stack” não listado | Baixa–Parcial | Não inventar Spark/Hadoop; falar throughput, partições Kafka, batch |
| Liderança técnica / referência | Guias AppSec multi-squad; ADRs; mentoria soft skill CV | Boa | Trazer histórias STAR de influência sem cargo de TL formal |
| Documentação / guidelines | Confluence AppSec; ADRs; docs monorepos | Excelente | |
| Gestão pública / B2G | Não | Não identificado | Compensar com impacto social + sistemas críticos regulados (banking) |
| Remoto / CLT | Disponível remoto (CV) | Excelente | |

### Pontos fortes (para a Betha)

1. Java + microsserviços event-driven em **setor regulado** (transferível a gestão pública).  
2. AppSec/DevSecOps **operacional** (Mend/Fortify/Sonar) — casa com “segurança” da JD.  
3. Observabilidade + GitOps — casa com resiliência/escala.  
4. AI applied **com disciplina** (SDD/Copilot) — casa com requisito de IA **sem** virar ML Engineer.  
5. Experiência full stack suficiente para Produto.

### Pontos fracos / riscos

1. AWS serverless / profundidade cloud.  
2. CQRS e Big Data explícitos.  
3. Mobile nativo.  
4. Formação superior incompleta.  
5. Portfólio **AIOS-first** vs narrativa desejada (e vs produto Betha).  
6. purchase-ecosystem no CV mas fraco na vitrine do site.

---

## Etapa 3 — Projetos × requisitos da vaga

| Projeto | Requisitos que demonstra | Tech JD | Sr? | Arq? | Testes? | Obs? | DevOps/CI? | Mencionar? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **purchase-ecosystem** | MS, event-driven, Saga/DLQ, GitOps, SDD/Copilot, obs | Java, Kafka, PG, K8s, ArgoCD | Alta | Alta | Sim (JaCoCo) | Sim | Sim | **Sim — case #1** |
| **banking** (+ subrepos) | Plataforma, obs, CI/CD, full stack | Java, Angular, K8s, Prom | Alta | Média-Alta | Inferir | Sim | Sim | **Sim — case #2** |
| **VaultSpring** | Segurança, secrets, testes integração | Spring, Vault, Testcontainers | Média-Alta | Média | Sim | Baixa | Parcial | Sim (AppSec) |
| **infra-devtools** | Qualidade, DevSecOps, obs | Docker, Sonar, Prom, Grafana, OWASP | Média | Baixa | N/A tool | Sim | Makefile/CI local | Sim (tooling) |
| **kleilson-portfolio** | Web, TS, CI, qualidade editorial | React, TS, CF Workers | Média | Média | E2E/lint | Parcial | Sim | Sim (engenharia produto próprio) |
| **AIOS + Companion** | AI-assisted, LLMs/MCP, arquitetura, docs/ADRs | TS, monorepo, MCP | Alta (platform) | Alta | Vitest | Parcial | Sim | **Sim, 3º — como AI Applied**, não identidade |
| Mongo-RestFull-API | REST, JWT, Node/TS | TS, Mongo | Baixa-Média | Baixa | Parcial | Não | Parcial | Só se pedirem Node |
| OrderProcessingSystem | Batch, Redis, performance | Java, Batch | Média | Média | ? | Não | ? | Opcional |
| appsec-daily-hub / ai-driven | Conteúdo / automação AI | Fraco vs JD | Baixa | Baixa | Não | Não | Não | Evitar como prova de Sr |

### Ranking para entrevista

1. purchase-ecosystem (ou banking se purchase menos “fresco” na memória)  
2. Experiência Capgemini AppSec + APIs Kafka (produção)  
3. VaultSpring / infra-devtools  
4. AIOS/Companion (**1–2 min**, produtividade + fronteira arquitetural)  

---

## Etapa 4 — Posicionamento (visão recrutador/EM)

### O que chama atenção positivamente

- 9+ anos, Capgemini, Bradesco/BB, AppSec com métrica de vulnerabilidades.  
- Stack JD-core: Java, Kafka, MS, testes, K8s.  
- Maturidade Git/ADRs/releases (disciplina de engenharia).  
- AI applied alinhado ao texto da vaga.

### O que gera preocupação

- Site com AIOS como H1 (parece AI Engineer).  
- Gaps AWS serverless / Big Data / CQRS.  
- Superior incompleto.  
- “Liderança técnica” sem cargo TL — precisa de histórias.  
- Domínio gestão pública zero (mitigar com sistemas críticos + aprendizado de domínio).

### Perguntas que fariam para validar

- Maior sistema em produção: throughput, falhas, on-call?  
- Exemplo de decisão arquitetural que você liderou (não só executou).  
- Como usa IA no dia a dia **sem** reduzir qualidade/segurança?  
- Experiência real AWS vs lab?  
- Conflito com produto/arquitetura: como resolveu?

### Enfatizar

Banking crítico · Kafka/Saga · AppSec gates · Hexagonal · GitOps/obs · mentoria via guidelines · AI as accelerator · remoto/CLT ok · interesse em impacto gestão pública.

### Evitar

- Pitch “eu construo AI Operating System” como abertura.  
- Overclaim CQRS/serverless/Big Data/mobile nativo.  
- Badmouth Capgemini/cliente.  
- Pretensão salarial sem pesquisa (formulário pede salary — preparar faixa).

---

## Etapa 5 — Entrevista com a recrutadora (banco de perguntas)

Formato por pergunta: **Objetivo** · **O que busca** · **Resposta modelo** · **Erros**.

### Bloco A — Abertura e trajetória (1–12)

**1. Conte sobre você.**  
- Objetivo: filtro de clareza e senioridade.  
- Busca: narrativa 60–90s coerente.  
- Modelo: “Sou Software Engineer senior com ênfase backend, 9+ anos, Capgemini em financial services. Trabalho com Java/Spring, microsserviços event-driven com Kafka, AppSec e práticas de qualidade. Full stack com Angular/React quando a entrega exige. Uso IA de forma aplicada (Copilot/SDD) para acelerar entrega com qualidade — não como eixo exclusivo da carreira. Busco um produto com impacto social e desafios de escala/resiliência; a Betha em gestão pública combina com isso.”  
- Erros: monólogo 5 min; abrir com AIOS; listar 30 techs.

**2. Fale da sua trajetória.**  
- Objetivo: progressão lógica.  
- Busca: autonomia → complexidade → influência.  
- Modelo: Autônomo (entrega ponta a ponta) → Capgemini PixPJ/Consignados → AppSec+Backend Bradesco → projetos mobile/abertura contas/eDOX; evolução de executor para quem padroniza segurança e arquitetura.  
- Erros: buracos sem explicar; datas conflitantes (alinhar CV).

**3. Por que está buscando uma nova oportunidade?**  
- Objetivo: motivação vs fuga.  
- Busca: pull factors.  
- Modelo: “Quero aprofundar em produto de longo prazo com impacto em cidadãos/gestão pública, ambiente remoto CLT, e espaço para referência técnica. Valorizo GPTW e engenharia moderna (cloud, resiliência, IA aplicada) alinhados à Betha.”  
- Erros: falar mal do empregador atual; “só salário”.

**4. Por que a Betha?**  
- Objetivo: interesse genuíno.  
- Busca: pesquisa mínima.  
- Modelo: Plataforma de gestão pública, 40 anos, remote, cultura Betther/GPTW; JD combina Java/arquitetura moderna + IA aplicada; quero contribuir em Produto com sistemas críticos (experiência em ambiente regulado).  
- Erros: “vi a vaga e candidatei” sem contexto; confundir BU Saúde (espelhos) com **Produto** (vaga real).

**5. O que você sabe sobre a Betha?**  
- Modelo: gestão pública digital; conectar serviços ao cidadão; produto cloud; cultura GPTW. Admitir o que não sabe e curiosidade sobre BU Produto.  
- Erros: inventar clientes/produtos.

**6. Qual projeto teve maior impacto?**  
- Modelo: AppSec Capgemini — Mend/Fortify, −50% vulns, gates em PR; **ou** purchase-ecosystem (Saga/GitOps) como case técnico open. Preferir produção Capgemini para “impacto”.  
- Erros: escolher hub de notícias AppSec.

**7. Como você se descreve profissionalmente?**  
- Modelo: “Senior Backend/Full Stack pragmático, obsessivo com qualidade/segurança, colaborativo, documenta para escalar o time.”  
- Erros: “visionário de IA”.

**8. Quais são seus pontos fortes?**  
- Modelo: 2–3: (1) MS event-driven, (2) AppSec operacional, (3) disciplina de engenharia (testes/ADRs/GitOps).  
- Erros: 10 pontos; “sou perfeccionista” sem exemplo.

**9. Quais são seus pontos fracos?**  
- Modelo: “Profundidade em AWS serverless ainda menor que em Java/K8s — estudo ativo Lambda/SQS e busco mentoria; mitigo com analogias de mensageria/containers que já domino.”  
- Erros: “não tenho fracos”; fraco falso (“trabalho demais”).

**10. Onde se vê em 3–5 anos?**  
- Modelo: Referência técnica em produto (Staff-path), domínio de negócio gestão pública, ainda hands-on.  
- Erros: “quero ser CEO”; “só ML”.

**11. Preferência backend vs frontend?**  
- Modelo: Ênfase backend; confortável full stack para entrega de produto.  
- Erros: “só front” ou “odeio front”.

**12. Já trabalhou remoto?**  
- Modelo: Disponível e disciplinado; rotina Capgemini/remoto híbrido conforme fato real — **só afirmar o que for verdade**. Se híbrido/presencial histórico, dizer adaptação e setup.

### Bloco B — Comportamental / colaboração (13–28)

**13. Como lida com conflitos?**  
- STAR: divergência técnica → dados/ADR → alinhamento com arquiteto/PO.  
- Erros: “sempre evito conflito”.

**14. Como recebe feedback?**  
- Exemplo de feedback duro em code review → mudança de prática.  

**15. Como dá feedback?**  
- Específico, sobre código/comportamento, privado, com alternativa.

**16. Como trabalha em equipe / squad?**  
- Capgemini multi-squad AppSec: guidelines, PRs, pairing.

**17. Como organiza prioridades?**  
- Valor de negócio + risco (segurança) + WIP limit; Kanban.

**18. Como lida com prazo apertado?**  
- Negocia escopo; fatia MVP; não sacrifica segurança em banking — transferível.

**19. Conte um erro seu.**  
- Ex.: deploy/config; o que aprendeu (checklist, teste, feature flag). Honestidade > heroísmo.

**20. Maior desafio profissional.**  
- Migração Spring Boot 2→3→4 sem downtime **ou** remediação CVE em massa.

**21. Experiência com mentoria?**  
- Mentoria júnior (CV soft skill) + guias AppSec adotados por squads.

**22. Já liderou tecnicamente sem cargo de TL?**  
- Sim: padrões AppSec, ADRs, reviews — influência lateral.

**23. Como se comunica com não-técnicos?**  
- Risco em linguagem de negócio; opções A/B com trade-offs.

**24. Como documenta?**  
- ADRs, Confluence, README, Conventional Commits.

**25. Como reage a mudança de prioridade de produto?**  
- Replaneja sprint; preserva qualidade mínima.

**26. Preferência Scrum ou Kanban?**  
- Ambos; contexto dita; já usei os dois.

**27. Como mede sucesso do seu trabalho?**  
- Incidentes, lead time, cobertura, vulns, valor entregue — não só “story points”.

**28. Como lida com ambiguidade?**  
- Esclarece com PO; propõe spike; ADR se estrutural.

### Bloco C — Logística / oferta (29–40)

**29. Pretensão salarial.**  
- Objetivo: cabimento de banda.  
- Preparar: pesquisa faixas Sr Remote CLT SC/BR tech + benefícios Betha; dar **faixa** e abertura a negociar total package.  
- Erros: número sem pesquisa; “você que diga” demais.

**30. Disponibilidade para início.**  
- Ser concreto (ex. 30 dias / aviso prévio Capgemini — **validar contrato real**).

**31. Modelo de trabalho / timezone.**  
- Remote ok; overlap com equipe SC (Criciúma HQ típico Betha — **inferência**, confirmar).

**32. Precisa de equipamento / setup?**  
- Resposta prática.

**33. Tem outras entrevistas em andamento?**  
- Transparência sem arrogância.

**34. Por que sair da Capgemini / cliente bancário?**  
- Pull: produto próprio, impacto cidadão, remote CLT Betha — sem atacar.

**35. Aceita viajar ocasionalmente?**  
- Só o que for verdade.

**36. Inglês?**  
- Intermediário leitura técnica (CV) — honestidade; estudo contínuo.

**37. Formação incompleta — pode perguntar.**  
- Técnico completo + 9 anos; licenciatura trancada; aprendizado contínuo (cursos Kafka/hexagonal/Copilot).

**38. Conhece o setor público?**  
- Pouco hands-on; forte em sistemas críticos/compliance; motivado a aprender domínio.

**39. Expectativas dos primeiros 90 dias.**  
- Entender produto/domínio; entregar com mentoria do time; primeiro PR de valor; mapear riscos.

**40. Perguntas para a recrutadora?**  
- Ver checklist Etapa 11. Exemplos: etapa seguinte; composição do time Produto; stack oficial; banda salarial se ainda não falou; critérios de sucesso Sr.

### Bloco D — IA e diferenciais (41–45)

**41. Como você usa IA no trabalho?**  
- Copilot para boilerplate/testes/refatoração; sempre revisa; SDD com agentes/prompts versionados; **não** cola código cego em banking.

**42. Já colocou IA em produto?**  
- Se perguntarem: AIOS é open source de **governança** de agentes no SDLC — side project; na Capgemini foco foi produtividade. Não inventar feature IA em cliente bancário.

**43. O que te diferencia?**  
- AppSec + event-driven + disciplina de engenharia + AI applied maduro.

**44. Está alinhado à cultura GPTW / pessoas?**  
- Colaboração, documentação que escala pessoas, empatia profissional (CV).

**45. Algo que não perguntamos e deveria saber?**  
- Fechar com 1 frase: interesse genuíno + case AppSec/Kafka + remoto.

---

## Etapa 6 — Entrevista técnica (banco direcionado)

Legenda dificuldade: Básico · Médio · Avançado · Sr+

### 6.1 Backend Java / Spring

| # | Pergunta | Objetivo | Resposta esperada (resumo) | Personalizada (âncora) | Erros | Diff |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Ciclo de vida Bean Spring | Fundamentos | IoC, scopes | Relacionar a services em hexagonal | Memorizar sem uso | B |
| T2 | Diferença `@Transactional` e fronteiras | Consistência | Propagation, rollback | Saga vs local TX em MS | “TX em tudo” | M |
| T3 | JPA N+1 | Performance | join fetch, entity graph | Exemplo API lista | Ignorar | M |
| T4 | Idempotência em API/Kafka | Resiliência | keys, dedup | DLQ + retry backoff (CV) | Só “try/catch” | A |
| T5 | Outbox / Saga coreografia vs orquestração | Event-driven | trade-offs | purchase/Capgemini | Confundir os dois | A |
| T6 | Hexagonal vs Clean | Arquitetura | ports/adapters | CV hexagonal | Jargão vazio | M |
| T7 | Migração Spring Boot major | Produção | compat, testes, canary | 2→3→4 sem downtime | “foi só bump” | A |
| T8 | Segurança Spring Security / JWT | AppSec | authn/z, OWASP | squad AppSec | “JWT resolve tudo” | M |

### 6.2 Dados / mensageria

| # | Pergunta | Âncora | Diff |
| --- | --- | --- | --- |
| T9 | Índice PG, EXPLAIN | Performance APIs | M |
| T10 | Mongo vs PG quando usar | PixPJ ambos | M |
| T11 | Redis: cache vs lock | OrderProcessing / padrões | M |
| T12 | Kafka partitions, consumer groups, ordering | Event-driven banking | A |
| T13 | Poison message / DLQ | CV explícito | A |
| T14 | Exactly-once vs at-least-once | Honestidade: na prática at-least + idempotência | Sr+ |

### 6.3 Frontend

| # | Pergunta | Âncora | Diff |
| --- | --- | --- | --- |
| T15 | Angular change detection / signals | banking-core-ui Angular 18 | M |
| T16 | Estado em React | Portfolio React | M |
| T17 | Performance front (bundle, lazy) | Experiência geral | M |
| T18 | Segurança XSS/CSRF no front | AppSec mindset | M |

### 6.4 Arquitetura / resiliência / obs

| # | Pergunta | Âncora | Diff |
| --- | --- | --- | --- |
| T19 | Desenhe um MS de pedido ponta a ponta | purchase-ecosystem | A |
| T20 | Circuit breaker / timeout / bulkhead | Conceito + vontade de detalhar | A |
| T21 | Observabilidade: métrica vs log vs trace | Prom/Grafana/Actuator | A |
| T22 | CQRS: o que é e quando vale | **Gap** — estudar + dizer exposição limitada | A |
| T23 | DDD: aggregate e bounded context | Exemplo banking/purchase | M–A |
| T24 | Revisar arquitetura legada: por onde começa | Sr: riscos, seams, strangler | Sr+ |

### 6.5 DevOps / CI/CD / segurança

| # | Pergunta | Âncora | Diff |
| --- | --- | --- | --- |
| T25 | Pipeline CI ideal para MS Java | GHA/Jenkins + Sonar + SCA | M |
| T26 | Docker multi-stage | Prática | B–M |
| T27 | K8s probes, resources | k3d/GitOps | M–A |
| T28 | GitOps ArgoCD | CV | A |
| T29 | Sonar vs SAST vs SCA | Mend/Fortify/Sonar (CV) | A |
| T30 | Segredos (Vault) | VaultSpring | M |
| T31 | OWASP Top 10 na prática | A01–A06 no CV | M |

### 6.6 Cloud AWS / serverless (**gap — estudar**)

| # | Pergunta | Como responder com honestidade | Diff |
| --- | --- | --- | --- |
| T32 | EC2 vs ECS vs EKS vs Lambda | Conceitos + “produção forte em containers/K8s; AWS hands-on S3/EC2/IAM; serverless em estudo” | A |
| T33 | API Gateway + Lambda | Fluxo HTTP → função; frio; limites | M |
| T34 | SQS vs SNS vs Kafka | Comparar com Kafka que domina | M–A |
| T35 | IAM least privilege | AppSec mindset | M |
| T36 | Custo serverless vs sempre-on | Trade-offs | M |

### 6.7 AI Applied Engineering (secundário)

| # | Pergunta | Resposta personalizada | Erros | Diff |
| --- | --- | --- | --- | --- |
| T37 | Como usa Copilot sem degradar qualidade? | Review humano; testes; não secrets; SDD | “IA escreve tudo” | M |
| T38 | O que é SDD para você? | Spec/agentes/prompts versionados no repo | Buzzword | M |
| T39 | Já integrou LLM em produto? | AIOS open source (governança/MCP) — separar de job Capgemini | Inventar feature cliente | A |
| T40 | Riscos de IA em código (licença, alucinação, vazamento) | AppSec angle | Negar riscos | M |

### 6.8 Exercícios típicos de live coding / system design (preparar)

1. API REST idempotente de criação de recurso.  
2. Desenhar notificação assíncrona (fila + retry + DLQ).  
3. Modelar inconsistência entre serviços (Saga).  
4. Otimizar endpoint lento (N+1, índice, cache).  
5. Revisar PR com vulnerabilidade OWASP.

---

## Etapa 7 — Estudo direcionado (antes das entrevistas)

| Prioridade | Lacuna | Impacto | Tempo | Material / ação | Ordem |
| ---: | --- | --- | --- | --- | ---: |
| P0 | Pitch CV-first + Betha Produto | Alto | 2 h | Memorizar 60s/3min; alinhar LinkedIn/GitHub bio | 1 |
| P0 | STAR AppSec + Kafka/Saga + migração SB | Alto | 4 h | Escrever 5 STAR no papel | 2 |
| P0 | AWS fundamentos + Lambda/SQS/API GW | Alto | 8–12 h | AWS Skill Builder free / curso iniciante; diagramas | 3 |
| P1 | CQRS (teoria + exemplo) | Médio-Alto | 3 h | Artigo Microsoft CQRS + mapear se faz sentido em purchase | 4 |
| P1 | System design 1h whiteboard | Alto | 4 h | Desenhar purchase e “serviço cidadão” B2G fictício | 5 |
| P1 | Revisar Observabilidade (RED/USE, tracing) | Médio | 2 h | Docs Micrometer/OTel overview | 6 |
| P2 | Big Data: honestidade + Kafka throughput | Médio | 2 h | Partitions, consumer lag — sem fingir Spark | 7 |
| P2 | DDD refresher | Médio | 2 h | Aggregates; 1 exemplo | 8 |
| P2 | Mobile: preparar frase honesta | Baixo | 30 min | Renegociação = full stack jornada; sem nativo | 9 |
| P3 | Reordenar portfólio (se der tempo) | Alto p/ marca | 1 dia | Ver auditoria branding — purchase first | 10 |

---

## Etapa 8 — Riscos e objeções

| Risco | Por que surge | Como responder | Virar positivo |
| --- | --- | --- | --- |
| “Você é AI Engineer?” | Site AIOS + JD menciona IA | “Sou SWE Sr; IA é acelerador; AIOS é open source de governança no SDLC” | Casa com requisito IA da Betha **no framing certo** |
| AWS fraco | JD exige AWS/serverless | Honestidade + plano de estudo + analogias Kafka/K8s | Maturidade e aprendizado rápido |
| Sem gestão pública | Empresa B2G | Sistemas críticos bancários + compliance; motivação impacto cidadão | Transferência de criticidade |
| Superior incompleto | Requisito formação | Técnico + 9 anos + cursos | Evidência > diploma |
| Não é TL formal | JD “liderar tecnicamente” | Influência via AppSec multi-squad, ADRs, reviews | Liderança lateral |
| CQRS/Big Data | Lista JD | Exposição limitada; event-driven forte; estudo | Não bluff |
| Projetos pessoais demais | GitHub AIOS recente | Separar produção Capgemini vs open source | Disciplina open source = qualidade |
| Mudança de emprego | Processo seletivo | Pull Betha remote/produto/impacto | Estabilidade buscada em CLT |
| Pretensão | Form pede salary | Faixa pesquisada | Transparência |
| Inglês | Possível | Intermediário leitura; comunicação clara PT | Honestidade |

---

## Etapa 9 — Pitches

### 30 segundos

“Sou Kleilson, Software Engineer senior com ênfase backend, 9+ anos na Capgemini em financial services. Trabalho com Java/Spring, microsserviços e Kafka, com forte atuação em AppSec e qualidade. Uso IA de forma aplicada para acelerar entrega com segurança. Busco a Betha para atuar em Produto, remoto, com impacto em gestão pública.”

### 1 minuto

(+ full stack Angular/React; métrica −50% vulns; GitOps/obs; interesse GPTW/Betha; AI como diferencial, não título.)

### 3 minutos

Estrutura: (1) quem sou, (2) Capgemini AppSec+Kafka, (3) case técnico purchase/banking, (4) como trabalho (ADRs, testes, ágil), (5) IA applied, (6) por que Betha Produto remote, (7) o que busco nos 90 dias.

### 5 minutos

(+ STAR completo AppSec; desenho verbal Saga; lição migração Spring; 1 gap AWS com plano; perguntas inteligentes.)

**Posicionamento-alvo (frase âncora):**  
> Senior Full Stack Software Engineer — Arquitetura Moderna, Backend Java, Frontend, Cloud, DevSecOps e AI Applied Engineering.

---

## Etapa 10 — Simulação mista (amostra pontuada)

**S1. Recrutadora: “Me conte sobre você.”**  
Resposta: pitch 60s CV-first.  
**Nota: 8.5** — Melhorar: 1 frase Betha Produto no fechamento.

**S2. “Por que sair do banco/Capgemini?”**  
Resposta: pull produto longo prazo + impacto cidadão + remote CLT.  
**Nota: 8** — Evitar qualquer tom de queixa.

**S3. Tech: “Como garante idempotência com Kafka?”**  
Resposta: chave de idempotência, dedup store, at-least-once + handlers idempotentes, DLQ.  
**Nota: 9** se citar caso real; **6** se só teoria.

**S4. “Explique CQRS no seu último projeto.”**  
Resposta honesta: “Não implementei CQRS formal; separei responsabilidades de leitura/escrita em serviços; estou aprofundando o padrão.”  
**Nota: 7.5** (honestidade Sr) · **3** se inventar.

**S5. “Desenhe notificação serverless na AWS.”**  
Resposta: API GW/Lambda ou SNS→SQS→worker; comparar com Kafka que conhece; admitir menos hours em Lambda.  
**Nota: 7** com trade-offs; **4** se travar.

**S6. “Como usa IA e como controla risco?”**  
Resposta: Copilot + review + testes + sem dados sensíveis; SDD.  
**Nota: 9** — alinhado à JD.

**S7. Behavioral: conflito com arquiteto.**  
STAR com ADR e dados.  
**Nota: 8.**

**S8. “Experiência mobile?”**  
Resposta: projeto renegociação full stack; foco APIs/jornada; não nativo.  
**Nota: 7.5.**

**S9. “Big Data?”**  
Resposta: não stack Hadoop; experiência com alto volume mensageria/batch; disposto a aprender.  
**Nota: 7.**

**S10. Encerramento: perguntas ao time.**  
Perguntas sobre SLIs, stack AWS, como Sr influencia roadmap.  
**Nota: 8.5.**

---

## Etapa 11 — Plano de aprovação

### Antes

**Técnico**
- [ ] 5 STAR escritos  
- [ ] Diagramas purchase + notificação  
- [ ] Flashcards Kafka/Saga/DLQ/idempotência  
- [ ] 8–12 h AWS serverless overview  
- [ ] 1 página CQRS  
- [ ] Revisar CV datas/projetos  

**Psicológico**
- [ ] Dormir bem  
- [ ] Aceitar gaps (script honesto)  
- [ ] Lembrete: você é SWE Sr, não impostor AI  

**Comunicação**
- [ ] Pitch 30s/1min gravado no celular  
- [ ] Evitar filler; pausar  

**Ambiente**
- [ ] Câmera/luz/fone; rede estável  
- [ ] Água; repo/CV PDF aberto  

**Currículo**
- [ ] PDF CV 2026; AIOS no máximo 1 bullet “open source / AI applied”  
- [ ] purchase-ecosystem visível  

**GitHub**
- [ ] Bio = CV headline  
- [ ] README sem contradição AI-first  
- [ ] Pinned: purchase, banking, portfolio, VaultSpring, (AIOS 5º)  

**LinkedIn**
- [ ] Headline = CV  
- [ ] Featured alinhado  
- [ ] About: banking primeiro, IA no fim  

**Portfólio**
- [ ] Ideal: reordenar featured (auditoria branding)  
- [ ] Se não der tempo: na entrevista **guiar** o recrutador para Capgemini/purchase, não deixar só o H1 falar  

### Durante

- Iniciar com pitch curto.  
- STAR: Situação → Tarefa → Ação → Resultado (número se auditável).  
- Projetos: problema → arquitetura → trade-off → resultado.  
- Arquitetura: desenhar, restrições, o que mediria.  
- Desafios: incluir o que **não** funcionou.  
- Senioridade: trade-offs e impacto no time.  
- Colaboração: “nós” + seu papel claro.  
- Encerrar: interesse + 2–3 perguntas.  

**Perguntas inteligentes**
1. Como o time de Produto define sucesso técnico (SLOs)?  
2. Qual a stack cloud/observabilidade padrão hoje?  
3. Como Sr participa de decisões com arquitetura/produto?  
4. Qual o maior desafio técnico dos próximos 6 meses?  
5. Como a Betha espera o uso de IA no dia a dia vs no produto?

### Depois

- [ ] E-mail/LinkedIn de agradecimento em 24 h  
- [ ] 2 frases reforçando fit (AppSec + event-driven + IA applied)  
- [ ] 1 frase honestidade de aprendizado AWS se discutido  
- [ ] Follow-up se prazo da próxima etapa passar  

---

## Notas finais e ações de maior impacto

### Nota geral de aderência: **7.4 / 10**

### Probabilidade estimada de aprovação: **55–70%**

Condicionada a: pitch alinhado ao CV, honestidade nos gaps AWS/CQRS/Big Data, e **não** deixar a marca pessoal AIOS-first definir a entrevista. Cai para ~40% se a primeira impressão for “candidato de IA/plataforma de agentes” sem âncora banking/Java.

### 10 ações de maior impacto

1. Memorizar pitch 60s **CV-first** + “Betha Produto / gestão pública / remote”.  
2. Preparar STAR **AppSec −50%** e STAR **Kafka/Saga/DLQ**.  
3. Case técnico #1: **purchase-ecosystem** ou banking (desenho em 1 página).  
4. Script honesto **AWS serverless** + 8–12 h de estudo focado.  
5. Script **CQRS** (conceito + “não usei formal”).  
6. Alinhar LinkedIn/GitHub bio ao CV **antes** da call.  
7. Na call, **não** abrir com AIOS; mencionar IA só quando pedirem ou no diferencial.  
8. Confirmar com recrutadora: etapas, banda, stack do time Produto.  
9. Lista de 5 perguntas inteligentes (Etapa 11).  
10. Se houver tempo: P0 da auditoria de branding no portfólio (purchase first).

---

## Apêndice A — Texto-fonte da vaga (resumo fiel)

- **Cargo:** Desenvolvedor(a) Sênior — **área de Produto**  
- **Empresa:** Betha — plataforma digital para gestão pública  
- **Modelo:** Remote · CLT  
- **Responsabilidades:** liderança técnica, IA/automação, revisão de arquitetura, referência para o time, colaboração com arquitetos, integração, ágeis, decisões estratégicas, documentação, revisão de portfólio  
- **Requisitos:** formação TI; **Java 8/11/17/21** + JS/TS + frameworks; AI-assisted + LLMs; boas práticas; Git + Scrum/Kanban; segurança/qualidade/testes; DDD/MS/Event Driven/CQRS/Clean; web/mobile/REST; mensageria; SQL/NoSQL; Docker/K8s/CI/CD; **AWS + serverless**; observabilidade/performance; Big Data/larga escala  

## Apêndice B — Referências internas

- [`personal-branding-positioning-audit-2026-07.md`](./personal-branding-positioning-audit-2026-07.md)  
- CV local: `Kleilson_Santos_CV_2026.docx`  
- Site: https://kleilson-portfolio.pages.dev  
- GitHub: https://github.com/KleilsonSantos  
- Vaga: https://betha.inhire.app/vagas/8869d554-9b65-48ff-973d-3d72007b1050/desenvolvedor-sr  

---

*Documento vivo: atualizar após a entrevista com a recrutadora (stack confirmada, banda, próximas etapas).*
