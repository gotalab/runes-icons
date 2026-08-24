# Runes 360 candidate inventory

updated: 2026-08-22

Authority rule: every row records one semantic `decision` and one implementation `state`. Decisions are `new:<slug>`, `alias:<slug>`, `merged:<slug>`, or `rejected:<reason>`; states are `pending`, `in-progress`, `implemented`, or `verified`. A row is checked only at `verified`. Final reporting counts `decision:new + state:verified` as an implemented canonical addition.

## General UI — Core Actions (20)

- [x] `arrow-left` — decision:new:arrow-left; state:verified; wave:T2; family:core-actions
- [x] `arrow-up` — decision:new:arrow-up; state:verified; wave:T2; family:core-actions
- [x] `arrow-down` — decision:new:arrow-down; state:verified; wave:T2; family:core-actions
- [x] `chevron-left` — decision:new:chevron-left; state:verified; wave:T2; family:core-actions
- [x] `chevron-right` — decision:new:chevron-right; state:verified; wave:T2; family:core-actions
- [x] `chevron-up` — decision:new:chevron-up; state:verified; wave:T2; family:core-actions
- [x] `chevron-down` — decision:new:chevron-down; state:verified; wave:T2; family:core-actions
- [x] `minus` — decision:new:minus; state:verified; wave:T2; family:core-actions
- [x] `x` — decision:new:x; state:verified; wave:T2; family:core-actions
- [x] `save` — decision:new:save; state:verified; wave:T2; family:core-actions
- [x] `edit` — decision:new:edit; state:verified; wave:T2; family:core-actions
- [x] `copy` — decision:new:copy; state:verified; wave:T2; family:core-actions
- [x] `trash` — decision:new:trash; state:verified; wave:T2; family:core-actions
- [x] `download` — decision:new:download; state:verified; wave:T2; family:core-actions
- [x] `upload` — decision:new:upload; state:verified; wave:T2; family:core-actions
- [x] `refresh` — decision:new:refresh; state:verified; wave:T2; family:core-actions
- [x] `undo` — decision:new:undo; state:verified; wave:T2; family:core-actions
- [x] `redo` — decision:new:redo; state:verified; wave:T2; family:core-actions
- [x] `filter` — decision:new:filter; state:verified; wave:T2; family:core-actions
- [x] `external-link` — decision:new:external-link; state:verified; wave:T2; family:core-actions

## General UI — People and Communication (20)

- [x] `users` — decision:new:users; state:verified; wave:T2; family:people-communication
- [x] `user-plus` — decision:new:user-plus; state:verified; wave:T2; family:people-communication
- [x] `user-minus` — decision:new:user-minus; state:verified; wave:T2; family:people-communication
- [x] `user-check` — decision:new:user-check; state:verified; wave:T2; family:people-communication
- [x] `contact` — decision:new:contact; state:verified; wave:T2; family:people-communication
- [x] `id-card` — decision:new:id-card; state:verified; wave:T2; family:people-communication
- [x] `mail` — decision:new:mail; state:verified; wave:T2; family:people-communication
- [x] `mail-open` — decision:new:mail-open; state:verified; wave:T2; family:people-communication
- [x] `inbox` — decision:new:inbox; state:verified; wave:T2; family:people-communication
- [x] `send` — decision:new:send; state:verified; wave:T2; family:people-communication
- [x] `reply` — decision:new:reply; state:verified; wave:T2; family:people-communication
- [x] `forward` — decision:new:forward; state:verified; wave:T2; family:people-communication
- [x] `at-sign` — decision:new:at-sign; state:verified; wave:T2; family:people-communication
- [x] `link` — decision:new:link; state:verified; wave:T2; family:people-communication
- [x] `unlink` — decision:new:unlink; state:verified; wave:T2; family:people-communication
- [x] `phone` — decision:new:phone; state:verified; wave:T2; family:people-communication
- [x] `video` — decision:new:video; state:verified; wave:T2; family:people-communication
- [x] `microphone` — decision:new:microphone; state:verified; wave:T2; family:people-communication
- [x] `chat-group` — decision:new:chat-group; state:verified; wave:T2; family:people-communication
- [x] `announcement` — decision:new:announcement; state:verified; wave:T2; family:people-communication

## General UI — Files and Content (20)

- [x] `file-plus` — decision:new:file-plus; state:verified; wave:T2; family:files-content
- [x] `file-minus` — decision:new:file-minus; state:verified; wave:T2; family:files-content
- [x] `file-check` — decision:new:file-check; state:verified; wave:T2; family:files-content
- [x] `file-code` — decision:new:file-code; state:verified; wave:T2; family:files-content
- [x] `file-text` — decision:new:file-text; state:verified; wave:T2; family:files-content
- [x] `file-image` — decision:new:file-image; state:verified; wave:T2; family:files-content
- [x] `file-audio` — decision:new:file-audio; state:verified; wave:T2; family:files-content
- [x] `file-video` — decision:new:file-video; state:verified; wave:T2; family:files-content
- [x] `files` — decision:new:files; state:verified; wave:T2; family:files-content
- [x] `folder-open` — decision:new:folder-open; state:verified; wave:T2; family:files-content
- [x] `folder-plus` — decision:new:folder-plus; state:verified; wave:T2; family:files-content
- [x] `archive` — decision:new:archive; state:verified; wave:T2; family:files-content
- [x] `clipboard` — decision:new:clipboard; state:verified; wave:T2; family:files-content
- [x] `clipboard-check` — decision:new:clipboard-check; state:verified; wave:T2; family:files-content
- [x] `paperclip` — decision:new:paperclip; state:verified; wave:T2; family:files-content
- [x] `import` — decision:new:import; state:verified; wave:T2; family:files-content
- [x] `export` — decision:new:export; state:verified; wave:T2; family:files-content
- [x] `scan` — decision:new:scan; state:verified; wave:T2; family:files-content
- [x] `qr-code` — decision:new:qr-code; state:verified; wave:T2; family:files-content
- [x] `book-open` — decision:new:book-open; state:verified; wave:T2; family:files-content

## General UI — Status, Time, and View (20)

- [x] `info` — decision:new:info; state:verified; wave:T2; family:status-time-view
- [x] `help-circle` — decision:new:help-circle; state:verified; wave:T2; family:status-time-view
- [x] `warning` — decision:new:warning; state:verified; wave:T2; family:status-time-view
- [x] `error` — decision:new:error; state:verified; wave:T2; family:status-time-view
- [x] `loader` — decision:new:loader; state:verified; wave:T2; family:status-time-view
- [x] `more-horizontal` — decision:new:more-horizontal; state:verified; wave:T2; family:status-time-view
- [x] `more-vertical` — decision:new:more-vertical; state:verified; wave:T2; family:status-time-view
- [x] `eye` — decision:new:eye; state:verified; wave:T2; family:status-time-view
- [x] `eye-off` — decision:new:eye-off; state:verified; wave:T2; family:status-time-view
- [x] `clock` — decision:new:clock; state:verified; wave:T2; family:status-time-view
- [x] `timer` — decision:new:timer; state:verified; wave:T2; family:status-time-view
- [x] `stopwatch` — decision:new:stopwatch; state:verified; wave:T2; family:status-time-view
- [x] `history` — decision:new:history; state:verified; wave:T2; family:status-time-view
- [x] `bookmark` — decision:new:bookmark; state:verified; wave:T2; family:status-time-view
- [x] `star` — decision:new:star; state:verified; wave:T2; family:status-time-view
- [x] `pin` — decision:new:pin; state:verified; wave:T2; family:status-time-view
- [x] `flag` — decision:new:flag; state:verified; wave:T2; family:status-time-view
- [x] `tag` — decision:new:tag; state:verified; wave:T2; family:status-time-view
- [x] `sort` — decision:new:sort; state:verified; wave:T2; family:status-time-view
- [x] `success-circle` — decision:alias:done; state:verified; wave:T2; family:status-time-view

## General UI — Editing and Presentation (20)

- [x] `print` — decision:new:print; state:verified; wave:T2; family:editing-presentation
- [x] `presentation` — decision:new:presentation; state:verified; wave:T2; family:editing-presentation
- [x] `projector` — decision:new:projector; state:verified; wave:T2; family:editing-presentation
- [x] `slides` — decision:new:slides; state:verified; wave:T2; family:editing-presentation
- [x] `image` — decision:new:image; state:verified; wave:T2; family:editing-presentation
- [x] `camera` — decision:new:camera; state:verified; wave:T2; family:editing-presentation
- [x] `crop` — decision:new:crop; state:verified; wave:T2; family:editing-presentation
- [x] `palette` — decision:new:palette; state:verified; wave:T2; family:editing-presentation
- [x] `pen-tool` — decision:new:pen-tool; state:verified; wave:T2; family:editing-presentation
- [x] `type` — decision:new:type; state:verified; wave:T2; family:editing-presentation
- [x] `bold` — decision:new:bold; state:verified; wave:T2; family:editing-presentation
- [x] `italic` — decision:new:italic; state:verified; wave:T2; family:editing-presentation
- [x] `underline` — decision:new:underline; state:verified; wave:T2; family:editing-presentation
- [x] `list` — decision:new:list; state:verified; wave:T2; family:editing-presentation
- [x] `table` — decision:new:table; state:verified; wave:T2; family:editing-presentation
- [x] `columns` — decision:new:columns; state:verified; wave:T2; family:editing-presentation
- [x] `rows` — decision:new:rows; state:verified; wave:T2; family:editing-presentation
- [x] `align-left` — decision:new:align-left; state:verified; wave:T2; family:editing-presentation
- [x] `fullscreen` — decision:new:fullscreen; state:verified; wave:T2; family:editing-presentation
- [x] `screen-share` — decision:new:screen-share; state:verified; wave:T2; family:editing-presentation

## AI and Agent — Foundation and Context (20)

- [x] `embedding` — decision:new:embedding; state:verified; wave:T3; family:ai-foundation
- [x] `vector-store` — decision:new:vector-store; state:verified; wave:T3; family:ai-foundation
- [x] `token` — decision:new:token; state:verified; wave:T3; family:ai-foundation
- [x] `token-stream` — decision:new:token-stream; state:verified; wave:T3; family:ai-foundation
- [x] `context-window` — decision:new:context-window; state:verified; wave:T3; family:ai-foundation
- [x] `context-compaction` — decision:new:context-compaction; state:verified; wave:T3; family:ai-foundation
- [x] `retrieval` — decision:new:retrieval; state:verified; wave:T3; family:ai-foundation
- [x] `reranking` — decision:new:reranking; state:verified; wave:T3; family:ai-foundation
- [x] `grounding` — decision:new:grounding; state:verified; wave:T3; family:ai-foundation
- [x] `multimodal` — decision:new:multimodal; state:verified; wave:T3; family:ai-foundation
- [x] `vision` — decision:new:vision; state:verified; wave:T3; family:ai-foundation
- [x] `speech` — decision:new:speech; state:verified; wave:T3; family:ai-foundation
- [x] `image-generation` — decision:new:image-generation; state:verified; wave:T3; family:ai-foundation
- [x] `structured-output` — decision:new:structured-output; state:verified; wave:T3; family:ai-foundation
- [x] `response-stream` — decision:merged:token-stream; state:verified; wave:T3; family:ai-foundation
- [x] `model-router` — decision:new:model-router; state:verified; wave:T3; family:ai-foundation
- [x] `model-fallback` — decision:new:model-fallback; state:verified; wave:T3; family:ai-foundation
- [x] `model-ensemble` — decision:new:model-ensemble; state:verified; wave:T3; family:ai-foundation
- [x] `fine-tuning` — decision:new:fine-tuning; state:verified; wave:T3; family:ai-foundation
- [x] `inference` — decision:new:inference; state:verified; wave:T3; family:ai-foundation

## AI and Agent — Roles and Operations (20)

- [x] `planner-agent` — decision:new:planner-agent; state:verified; wave:T3; family:agent-roles
- [x] `worker-agent` — decision:new:worker-agent; state:verified; wave:T3; family:agent-roles
- [x] `reviewer-agent` — decision:new:reviewer-agent; state:verified; wave:T3; family:agent-roles
- [x] `researcher-agent` — decision:new:researcher-agent; state:verified; wave:T3; family:agent-roles
- [x] `coding-agent` — decision:new:coding-agent; state:verified; wave:T3; family:agent-roles
- [x] `browser-agent` — decision:new:browser-agent; state:verified; wave:T3; family:agent-roles
- [x] `computer-use-agent` — decision:merged:computer-use; state:verified; wave:T3; family:agent-roles
- [x] `realtime-agent` — decision:new:realtime-agent; state:verified; wave:T3; family:agent-roles
- [x] `agent-team` — decision:new:agent-team; state:verified; wave:T3; family:agent-roles
- [x] `subagent` — decision:new:subagent; state:verified; wave:T3; family:agent-roles
- [x] `delegation` — decision:new:delegation; state:verified; wave:T3; family:agent-roles
- [x] `routing` — decision:new:routing; state:verified; wave:T3; family:agent-roles
- [x] `agent-session` — decision:new:agent-session; state:verified; wave:T3; family:agent-roles
- [x] `agent-state` — decision:new:agent-state; state:verified; wave:T3; family:agent-roles
- [x] `plan` — decision:new:plan; state:verified; wave:T3; family:agent-roles
- [x] `task` — decision:new:task; state:verified; wave:T3; family:agent-roles
- [x] `task-queue` — decision:new:task-queue; state:verified; wave:T3; family:agent-roles
- [x] `approval-request` — decision:alias:human-gate; state:verified; wave:T3; family:agent-roles
- [x] `trace` — decision:new:trace; state:verified; wave:T3; family:agent-roles
- [x] `benchmark` — decision:new:benchmark; state:verified; wave:T3; family:agent-roles

## AI and Agent — Generative AI and Machine Learning (20)

- [x] `training-data` — decision:alias:dataset; state:verified; wave:T3; family:ml-generation
- [x] `dataset` — decision:new:dataset; state:verified; wave:T3; family:ml-generation
- [x] `data-labeling` — decision:new:data-labeling; state:verified; wave:T3; family:ml-generation
- [x] `feature` — decision:new:feature; state:verified; wave:T3; family:ml-generation
- [x] `feature-store` — decision:new:feature-store; state:verified; wave:T3; family:ml-generation
- [x] `neural-network` — decision:new:neural-network; state:verified; wave:T3; family:ml-generation
- [x] `transformer` — decision:new:transformer; state:verified; wave:T3; family:ml-generation
- [x] `attention` — decision:new:attention; state:verified; wave:T3; family:ml-generation
- [x] `latent-space` — decision:alias:embedding; state:verified; wave:T3; family:ml-generation
- [x] `diffusion` — decision:new:diffusion; state:verified; wave:T3; family:ml-generation
- [x] `model-weight` — decision:alias:model-checkpoint; state:verified; wave:T3; family:ml-generation
- [x] `model-checkpoint` — decision:new:model-checkpoint; state:verified; wave:T3; family:ml-generation
- [x] `quantization` — decision:new:quantization; state:verified; wave:T3; family:ml-generation
- [x] `distillation` — decision:new:distillation; state:verified; wave:T3; family:ml-generation
- [x] `synthetic-data` — decision:new:synthetic-data; state:verified; wave:T3; family:ml-generation
- [x] `prompt-cache` — decision:new:prompt-cache; state:verified; wave:T3; family:ml-generation
- [x] `semantic-cache` — decision:new:semantic-cache; state:verified; wave:T3; family:ml-generation
- [x] `model-registry` — decision:new:model-registry; state:verified; wave:T3; family:ml-generation
- [x] `model-serving` — decision:new:model-serving; state:verified; wave:T3; family:ml-generation
- [x] `gpu` — decision:new:gpu; state:verified; wave:T3; family:ml-generation

## AI and Agent — Context and Runtime (15)

- [x] `system-prompt` — decision:alias:instruction; state:verified; wave:T3; family:agent-context-runtime
- [x] `dynamic-instructions` — decision:alias:prompt-template; state:verified; wave:T3; family:agent-context-runtime
- [x] `context-injection` — decision:new:context-injection; state:verified; wave:T3; family:agent-context-runtime
- [x] `context-isolation` — decision:new:context-isolation; state:verified; wave:T3; family:agent-context-runtime
- [x] `long-term-memory` — decision:alias:memory; state:verified; wave:T3; family:agent-context-runtime
- [x] `episodic-memory` — decision:alias:memory; state:verified; wave:T3; family:agent-context-runtime
- [x] `semantic-memory` — decision:alias:memory; state:verified; wave:T3; family:agent-context-runtime
- [x] `working-memory` — decision:alias:memory; state:verified; wave:T3; family:agent-context-runtime
- [x] `conversation-state` — decision:new:conversation-state; state:verified; wave:T3; family:agent-context-runtime
- [x] `run-context` — decision:new:run-context; state:verified; wave:T3; family:agent-context-runtime
- [x] `tool-context` — decision:merged:run-context; state:verified; wave:T3; family:agent-context-runtime
- [x] `context-filter` — decision:new:context-filter; state:verified; wave:T3; family:agent-context-runtime
- [x] `context-overflow` — decision:new:context-overflow; state:verified; wave:T3; family:agent-context-runtime
- [x] `hallucination` — decision:new:hallucination; state:verified; wave:T3; family:ai-evals-safety
- [x] `uncertainty` — decision:new:uncertainty; state:verified; wave:T3; family:ai-evals-safety
- [x] `citation` — decision:new:citation; state:verified; wave:T3; family:ai-evals-safety
- [x] `provenance` — decision:new:provenance; state:verified; wave:T3; family:ai-evals-safety
- [x] `agent-budget` — decision:new:agent-budget; state:verified; wave:T3; family:agent-context-runtime
- [x] `agent-timeout` — decision:alias:timer; state:verified; wave:T3; family:agent-context-runtime
- [x] `kill-switch` — decision:new:kill-switch; state:verified; wave:T3; family:ai-evals-safety

## AI and Agent — Evals, Research, and Safety (25)

- [x] `eval-case` — decision:new:eval-case; state:verified; wave:T3; family:ai-evals-safety
- [x] `eval-suite` — decision:new:eval-suite; state:verified; wave:T3; family:ai-evals-safety
- [x] `golden-dataset` — decision:alias:dataset; state:verified; wave:T3; family:ai-evals-safety
- [x] `rubric` — decision:new:rubric; state:verified; wave:T3; family:ai-evals-safety
- [x] `judge-model` — decision:new:judge-model; state:verified; wave:T3; family:ai-evals-safety
- [x] `human-evaluation` — decision:new:human-evaluation; state:verified; wave:T3; family:ai-evals-safety
- [x] `adversarial-test` — decision:merged:red-team; state:verified; wave:T3; family:ai-evals-safety
- [x] `red-team` — decision:new:red-team; state:verified; wave:T3; family:ai-evals-safety
- [x] `regression` — decision:new:regression; state:verified; wave:T3; family:ai-evals-safety
- [x] `trace-grading` — decision:new:trace-grading; state:verified; wave:T3; family:ai-evals-safety
- [x] `scorecard` — decision:new:scorecard; state:verified; wave:T3; family:ai-evals-safety
- [x] `pass-fail` — decision:new:pass-fail; state:verified; wave:T3; family:ai-evals-safety
- [x] `precision` — decision:new:precision; state:verified; wave:T3; family:ai-evals-safety
- [x] `recall` — decision:new:recall; state:verified; wave:T3; family:ai-evals-safety
- [x] `false-positive` — decision:new:false-positive; state:verified; wave:T3; family:ai-evals-safety
- [x] `false-negative` — decision:new:false-negative; state:verified; wave:T3; family:ai-evals-safety
- [x] `drift` — decision:new:drift; state:verified; wave:T3; family:ai-evals-safety
- [x] `bias` — decision:new:bias; state:verified; wave:T3; family:ai-evals-safety
- [x] `privacy` — decision:alias:shield; state:verified; wave:T3; family:ai-evals-safety
- [x] `pii-redaction` — decision:new:pii-redaction; state:verified; wave:T3; family:ai-evals-safety

## Data and Product — Data and Development Seed (20)

- [x] `chart-line` — decision:new:chart-line; state:verified; wave:T4; family:data-analytics
- [x] `chart-bar` — decision:new:chart-bar; state:verified; wave:T4; family:data-analytics
- [x] `dashboard` — decision:new:dashboard; state:verified; wave:T4; family:data-analytics
- [x] `gauge` — decision:new:gauge; state:verified; wave:T4; family:data-analytics
- [x] `trending-up` — decision:new:trending-up; state:verified; wave:T4; family:data-analytics
- [x] `funnel` — decision:new:funnel; state:verified; wave:T4; family:product-analytics
- [x] `query` — decision:new:query; state:verified; wave:T4; family:data-analytics
- [x] `data-pipeline` — decision:new:data-pipeline; state:verified; wave:T4; family:data-engineering
- [x] `data-lineage` — decision:new:data-lineage; state:verified; wave:T4; family:data-engineering
- [x] `data-quality` — decision:new:data-quality; state:verified; wave:T4; family:data-engineering
- [x] `code` — decision:new:code; state:verified; wave:T5; family:development
- [x] `terminal` — decision:new:terminal; state:verified; wave:T5; family:development
- [x] `command` — decision:new:command; state:verified; wave:T5; family:development
- [x] `braces` — decision:merged:code; state:verified; wave:T5; family:development
- [x] `bug` — decision:new:bug; state:verified; wave:T5; family:development
- [x] `test-tube` — decision:alias:test-unit; state:verified; wave:T5; family:development
- [x] `package` — decision:new:package; state:verified; wave:T5; family:development
- [x] `server` — decision:new:server; state:verified; wave:T5; family:development
- [x] `cloud` — decision:new:cloud; state:verified; wave:T5; family:development
- [x] `container` — decision:new:container; state:verified; wave:T5; family:development

## Data and Product — Data Engineering (20)

- [x] `source-system` — decision:new:source-system; state:verified; wave:T4; family:data-engineering
- [x] `ingestion` — decision:new:ingestion; state:verified; wave:T4; family:data-engineering
- [x] `batch` — decision:new:batch; state:verified; wave:T4; family:data-engineering
- [x] `stream` — decision:new:stream; state:verified; wave:T4; family:data-engineering
- [x] `change-data-capture` — decision:new:change-data-capture; state:verified; wave:T4; family:data-engineering
- [x] `event-bus` — decision:new:event-bus; state:verified; wave:T4; family:data-engineering
- [x] `message-queue` — decision:new:message-queue; state:verified; wave:T4; family:data-engineering
- [x] `data-lake` — decision:new:data-lake; state:verified; wave:T4; family:data-engineering
- [x] `data-warehouse` — decision:new:data-warehouse; state:verified; wave:T4; family:data-engineering
- [x] `lakehouse` — decision:new:lakehouse; state:verified; wave:T4; family:data-engineering
- [x] `data-mart` — decision:new:data-mart; state:verified; wave:T4; family:data-engineering
- [x] `etl` — decision:new:etl; state:verified; wave:T4; family:data-engineering
- [x] `elt` — decision:new:elt; state:verified; wave:T4; family:data-engineering
- [x] `transformation` — decision:new:transformation; state:verified; wave:T4; family:data-engineering
- [x] `pipeline-orchestration` — decision:new:pipeline-orchestration; state:verified; wave:T4; family:data-engineering
- [x] `schema` — decision:new:schema; state:verified; wave:T4; family:data-engineering
- [x] `schema-evolution` — decision:new:schema-evolution; state:verified; wave:T4; family:data-engineering
- [x] `partition` — decision:new:partition; state:verified; wave:T4; family:data-engineering
- [x] `incremental-load` — decision:new:incremental-load; state:verified; wave:T4; family:data-engineering
- [x] `backfill` — decision:new:backfill; state:verified; wave:T4; family:data-engineering

## Data and Product — Data Analytics (20)

- [x] `metric` — decision:new:metric; state:verified; wave:T4; family:data-analytics
- [x] `dimension` — decision:new:dimension; state:verified; wave:T4; family:data-analytics
- [x] `measure` — decision:new:measure; state:verified; wave:T4; family:data-analytics
- [x] `semantic-layer` — decision:new:semantic-layer; state:verified; wave:T4; family:data-analytics
- [x] `cube` — decision:new:cube; state:verified; wave:T4; family:data-analytics
- [x] `cohort` — decision:new:cohort; state:verified; wave:T4; family:data-analytics
- [x] `segment` — decision:new:segment; state:verified; wave:T4; family:data-analytics
- [x] `retention` — decision:new:retention; state:verified; wave:T4; family:product-analytics
- [x] `conversion` — decision:new:conversion; state:verified; wave:T4; family:product-analytics
- [x] `attribution` — decision:new:attribution; state:verified; wave:T4; family:product-analytics
- [x] `correlation` — decision:new:correlation; state:verified; wave:T4; family:data-analytics
- [x] `distribution` — decision:new:distribution; state:verified; wave:T4; family:data-analytics
- [x] `anomaly` — decision:new:anomaly; state:verified; wave:T4; family:data-analytics
- [x] `forecast` — decision:new:forecast; state:verified; wave:T4; family:data-analytics
- [x] `variance` — decision:new:variance; state:verified; wave:T4; family:data-analytics
- [x] `confidence-interval` — decision:new:confidence-interval; state:verified; wave:T4; family:data-analytics
- [x] `statistical-significance` — decision:new:statistical-significance; state:verified; wave:T4; family:data-analytics
- [x] `sample-size` — decision:new:sample-size; state:verified; wave:T4; family:data-analytics
- [x] `notebook` — decision:new:notebook; state:verified; wave:T4; family:data-analytics
- [x] `pivot-table` — decision:new:pivot-table; state:verified; wave:T4; family:data-analytics

## Data and Product — Product Analytics (20)

- [x] `event-tracking` — decision:new:event-tracking; state:verified; wave:T4; family:product-analytics
- [x] `page-view` — decision:new:page-view; state:verified; wave:T4; family:product-analytics
- [x] `screen-view` — decision:new:screen-view; state:verified; wave:T4; family:product-analytics
- [x] `click-event` — decision:new:click-event; state:verified; wave:T4; family:product-analytics
- [x] `user-journey` — decision:new:user-journey; state:verified; wave:T4; family:product-analytics
- [x] `funnel-analysis` — decision:alias:funnel; state:verified; wave:T4; family:product-analytics
- [x] `session-replay` — decision:new:session-replay; state:verified; wave:T4; family:product-analytics
- [x] `heatmap` — decision:new:heatmap; state:verified; wave:T4; family:product-analytics
- [x] `feature-adoption` — decision:new:feature-adoption; state:verified; wave:T4; family:product-analytics
- [x] `activation` — decision:new:activation; state:verified; wave:T4; family:product-analytics
- [x] `engagement` — decision:new:engagement; state:verified; wave:T4; family:product-analytics
- [x] `stickiness` — decision:new:stickiness; state:verified; wave:T4; family:product-analytics
- [x] `churn` — decision:new:churn; state:verified; wave:T4; family:product-analytics
- [x] `north-star-metric` — decision:new:north-star-metric; state:verified; wave:T4; family:product-analytics
- [x] `experiment` — decision:new:experiment; state:verified; wave:T4; family:product-analytics
- [x] `variant` — decision:new:variant; state:verified; wave:T4; family:product-analytics
- [x] `control-group` — decision:new:control-group; state:verified; wave:T4; family:product-analytics
- [x] `feature-exposure` — decision:new:feature-exposure; state:verified; wave:T4; family:product-analytics
- [x] `release-impact` — decision:new:release-impact; state:verified; wave:T4; family:product-analytics
- [x] `feedback` — decision:new:feedback; state:verified; wave:T4; family:product-analytics

## Software and Protocol — Protocols and Extensions (20)

- [x] `mcp-client` — decision:new:mcp-client; state:verified; wave:T5; family:protocol-extensions
- [x] `mcp-host` — decision:new:mcp-host; state:verified; wave:T5; family:protocol-extensions
- [x] `mcp-tool` — decision:alias:tool; state:verified; wave:T5; family:protocol-extensions
- [x] `mcp-prompt` — decision:alias:prompt-template; state:verified; wave:T5; family:protocol-extensions
- [x] `mcp-app` — decision:new:mcp-app; state:verified; wave:T5; family:protocol-extensions
- [x] `mcp-extension` — decision:new:mcp-extension; state:verified; wave:T5; family:protocol-extensions
- [x] `mcp-task` — decision:new:mcp-task; state:verified; wave:T5; family:protocol-extensions
- [x] `mcp-discovery` — decision:new:mcp-discovery; state:verified; wave:T5; family:protocol-extensions
- [x] `resource-template` — decision:new:resource-template; state:verified; wave:T5; family:protocol-extensions
- [x] `connector` — decision:new:connector; state:verified; wave:T5; family:protocol-extensions
- [x] `hook` — decision:new:hook; state:verified; wave:T5; family:protocol-extensions
- [x] `slash-command` — decision:new:slash-command; state:verified; wave:T5; family:protocol-extensions
- [x] `plugin-marketplace` — decision:new:plugin-marketplace; state:verified; wave:T5; family:protocol-extensions
- [x] `plugin-update` — decision:new:plugin-update; state:verified; wave:T5; family:protocol-extensions
- [x] `function-tool` — decision:alias:tool; state:verified; wave:T5; family:protocol-extensions
- [x] `deferred-tool` — decision:new:deferred-tool; state:verified; wave:T5; family:protocol-extensions
- [x] `tool-search` — decision:new:tool-search; state:verified; wave:T5; family:protocol-extensions
- [x] `tool-choice` — decision:new:tool-choice; state:verified; wave:T5; family:protocol-extensions
- [x] `shell` — decision:alias:terminal; state:verified; wave:T5; family:protocol-extensions
- [x] `computer-use` — decision:new:computer-use; state:verified; wave:T5; family:prompt-tools

## Software and Protocol — Security, Git, and Release (20)

- [x] `git-commit` — decision:new:git-commit; state:verified; wave:T5; family:software-quality
- [x] `git-merge` — decision:new:git-merge; state:verified; wave:T5; family:software-quality
- [x] `git-pull-request` — decision:new:git-pull-request; state:verified; wave:T5; family:software-quality
- [x] `git-fork` — decision:new:git-fork; state:verified; wave:T5; family:software-quality
- [x] `branch-protection` — decision:new:branch-protection; state:verified; wave:T5; family:security-release
- [x] `release` — decision:new:release; state:verified; wave:T5; family:software-quality
- [x] `rollback` — decision:new:rollback; state:verified; wave:T5; family:software-quality
- [x] `feature-flag` — decision:new:feature-flag; state:verified; wave:T5; family:software-quality
- [x] `key` — decision:new:key; state:verified; wave:T5; family:security-release
- [x] `lock` — decision:new:lock; state:verified; wave:T5; family:security-release
- [x] `unlock` — decision:new:unlock; state:verified; wave:T5; family:security-release
- [x] `fingerprint` — decision:new:fingerprint; state:verified; wave:T5; family:security-release
- [x] `identity` — decision:new:identity; state:verified; wave:T5; family:security-release
- [x] `permission` — decision:new:permission; state:verified; wave:T5; family:security-release
- [x] `secret` — decision:new:secret; state:verified; wave:T5; family:security-release
- [x] `audit-log` — decision:new:audit-log; state:verified; wave:T5; family:security-release
- [x] `policy` — decision:new:policy; state:verified; wave:T5; family:security-release
- [x] `input-guardrail` — decision:new:input-guardrail; state:verified; wave:T5; family:security-release
- [x] `output-guardrail` — decision:new:output-guardrail; state:verified; wave:T5; family:security-release
- [x] `tool-guardrail` — decision:new:tool-guardrail; state:verified; wave:T5; family:security-release

## Software and Protocol — Software Architecture and Design (20)

- [x] `architecture` — decision:new:architecture; state:verified; wave:T5; family:software-architecture
- [x] `component` — decision:new:component; state:verified; wave:T5; family:software-architecture
- [x] `module` — decision:new:module; state:verified; wave:T5; family:software-architecture
- [x] `layer` — decision:new:layer; state:verified; wave:T5; family:software-architecture
- [x] `boundary` — decision:new:boundary; state:verified; wave:T5; family:software-architecture
- [x] `interface` — decision:new:interface; state:verified; wave:T5; family:software-architecture
- [x] `dependency` — decision:new:dependency; state:verified; wave:T5; family:software-architecture
- [x] `coupling` — decision:new:coupling; state:verified; wave:T5; family:software-architecture
- [x] `cohesion` — decision:new:cohesion; state:verified; wave:T5; family:software-architecture
- [x] `abstraction` — decision:new:abstraction; state:verified; wave:T5; family:software-architecture
- [x] `adapter` — decision:new:adapter; state:verified; wave:T5; family:software-architecture
- [x] `gateway` — decision:new:gateway; state:verified; wave:T5; family:software-architecture
- [x] `repository` — decision:new:repository; state:verified; wave:T5; family:software-architecture
- [x] `service` — decision:new:service; state:verified; wave:T5; family:software-architecture
- [x] `domain-model` — decision:new:domain-model; state:verified; wave:T5; family:software-architecture
- [x] `entity` — decision:new:entity; state:verified; wave:T5; family:software-architecture
- [x] `value-object` — decision:new:value-object; state:verified; wave:T5; family:software-architecture
- [x] `event-driven` — decision:new:event-driven; state:verified; wave:T5; family:software-architecture
- [x] `state-machine` — decision:new:state-machine; state:verified; wave:T5; family:software-architecture
- [x] `decision-record` — decision:new:decision-record; state:verified; wave:T5; family:software-architecture

## Software and Protocol — Software Quality and Delivery (20)

- [x] `requirement` — decision:new:requirement; state:verified; wave:T5; family:software-quality
- [x] `prd` — decision:new:prd; state:verified; wave:T5; family:software-quality
- [x] `specification` — decision:new:specification; state:verified; wave:T5; family:software-quality
- [x] `design-review` — decision:new:design-review; state:verified; wave:T5; family:software-quality
- [x] `code-review` — decision:new:code-review; state:verified; wave:T5; family:software-quality
- [x] `test-unit` — decision:new:test-unit; state:verified; wave:T5; family:software-quality
- [x] `test-integration` — decision:new:test-integration; state:verified; wave:T5; family:software-quality
- [x] `test-e2e` — decision:new:test-e2e; state:verified; wave:T5; family:software-quality
- [x] `test-snapshot` — decision:new:test-snapshot; state:verified; wave:T5; family:software-quality
- [x] `test-coverage` — decision:new:test-coverage; state:verified; wave:T5; family:software-quality
- [x] `lint` — decision:new:lint; state:verified; wave:T5; family:software-quality
- [x] `type-check` — decision:new:type-check; state:verified; wave:T5; family:software-quality
- [x] `build-pipeline` — decision:new:build-pipeline; state:verified; wave:T5; family:software-quality
- [x] `continuous-integration` — decision:new:continuous-integration; state:verified; wave:T5; family:software-quality
- [x] `continuous-delivery` — decision:new:continuous-delivery; state:verified; wave:T5; family:software-quality
- [x] `release-candidate` — decision:alias:release; state:verified; wave:T5; family:software-quality
- [x] `migration` — decision:new:migration; state:verified; wave:T5; family:software-quality
- [x] `deprecation` — decision:new:deprecation; state:verified; wave:T5; family:software-quality
- [x] `technical-debt` — decision:new:technical-debt; state:verified; wave:T5; family:software-quality
- [x] `refactor` — decision:new:refactor; state:verified; wave:T5; family:software-quality

## Software and Protocol — Development allocation from Data/Development seed (10)

These ten candidates are already listed once under Data and Development Seed and are allocated to the Software wave during T0: `code`, `terminal`, `command`, `braces`, `bug`, `test-tube`, `package`, `server`, `cloud`, `container`. They are not repeated as additional candidate rows.
