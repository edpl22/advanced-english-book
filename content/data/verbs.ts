/**
 * Verb table for the tense generators and Appendix A.
 *
 * IRREGULAR: "base past participle = gloss-pt"; alternatives with "|"
 * (BrE form first where they differ, e.g. learnt|learned; AmE gotten).
 * A "*" after the base doubles the final consonant before -ing (run* → running).
 *
 * REGULAR: base forms. Suffix markers:
 *   *  double the final consonant (stop* → stopped, stopping)
 *   %  BrE doubles, AmE does not (travel% → travelled|traveled)
 *   ^  add k before -ed/-ing (panic^ → panicked, panicking)
 */

const IRREGULAR = `
arise arose arisen = surgir
awake awoke awoken = despertar
be was|were been = ser, estar
bear bore borne = suportar; carregar
beat beat beaten = bater; vencer
become became become = tornar-se
begin* began begun = começar
bend bent bent = curvar, dobrar
bet* bet bet = apostar
bid* bid bid = dar lance
bind bound bound = atar; obrigar
bite bit bitten = morder
bleed bled bled = sangrar
blow blew blown = soprar
break broke broken = quebrar
breed bred bred = criar (animais); gerar
bring brought brought = trazer
broadcast broadcast broadcast = transmitir
build built built = construir
burn burnt|burned burnt|burned = queimar
burst burst burst = estourar
buy bought bought = comprar
cast cast cast = lançar; escalar (elenco)
catch caught caught = pegar
choose chose chosen = escolher
cling clung clung = agarrar-se
come came come = vir
cost cost cost = custar
creep crept crept = rastejar
cut* cut cut = cortar
deal dealt dealt = lidar; negociar
dig* dug dug = cavar
dive dived|dove dived = mergulhar
do did done = fazer
draw drew drawn = desenhar; puxar
dream dreamt|dreamed dreamt|dreamed = sonhar
drink drank drunk = beber
drive drove driven = dirigir
dwell dwelt|dwelled dwelt|dwelled = morar; remoer
eat ate eaten = comer
fall fell fallen = cair
feed fed fed = alimentar
feel felt felt = sentir
fight fought fought = lutar
find found found = encontrar
flee fled fled = fugir
fling flung flung = arremessar
fly flew flown = voar
forbid* forbade forbidden = proibir
forecast forecast|forecasted forecast|forecasted = prever
foresee foresaw foreseen = prever
forget* forgot forgotten = esquecer
forgive forgave forgiven = perdoar
freeze froze frozen = congelar
get* got got|gotten = obter; ficar
give gave given = dar
go went gone = ir
grind ground ground = moer
grow grew grown = crescer; cultivar
hang hung hung = pendurar
have had had = ter
hear heard heard = ouvir
hide hid hidden = esconder
hit* hit hit = bater, atingir
hold held held = segurar; realizar
hurt hurt hurt = machucar
keep kept kept = manter
kneel knelt|kneeled knelt|kneeled = ajoelhar-se
know knew known = saber; conhecer
lay laid laid = pôr, depositar
lead led led = liderar; levar
lean leant|leaned leant|leaned = inclinar-se
leap leapt|leaped leapt|leaped = saltar
learn learnt|learned learnt|learned = aprender
leave left left = deixar; partir
lend lent lent = emprestar (a alguém)
let* let let = deixar, permitir
lie lay lain = deitar-se, jazer
light lit|lighted lit|lighted = acender
lose lost lost = perder
make made made = fazer
mean meant meant = significar; querer dizer
meet met met = encontrar; conhecer
mislead misled misled = enganar, induzir ao erro
mistake mistook mistaken = confundir
misunderstand misunderstood misunderstood = entender mal
overcome overcame overcome = superar
overhear overheard overheard = ouvir por acaso
oversee oversaw overseen = supervisionar
oversleep overslept overslept = dormir demais
overtake overtook overtaken = ultrapassar
overthrow overthrew overthrown = derrubar
pay paid paid = pagar
prove proved proved|proven = provar
put* put put = colocar
quit* quit quit = largar, desistir
read read read = ler
rebuild rebuilt rebuilt = reconstruir
rethink rethought rethought = repensar
rewrite rewrote rewritten = reescrever
rid* rid rid = livrar
ride rode ridden = andar (de bicicleta, cavalo)
ring rang rung = tocar (campainha); telefonar
rise rose risen = subir, levantar-se
run* ran run = correr; administrar
saw sawed sawn|sawed = serrar
say said said = dizer
see saw seen = ver
seek sought sought = buscar
sell sold sold = vender
send sent sent = enviar
set* set set = definir; pôr
sew sewed sewn|sewed = costurar
shake shook shaken = sacudir
shed* shed shed = derramar; perder (folhas, peso)
shine shone shone = brilhar
shoot shot shot = atirar; filmar
show showed shown|showed = mostrar
shrink shrank shrunk = encolher
shut* shut shut = fechar
sing sang sung = cantar
sink sank sunk = afundar
sit* sat sat = sentar-se
sleep slept slept = dormir
slide slid slid = deslizar
sling slung slung = atirar; pendurar
slit* slit slit = cortar (em tira)
smell smelt|smelled smelt|smelled = cheirar
sow sowed sown|sowed = semear
speak spoke spoken = falar
speed sped|speeded sped|speeded = acelerar
spell spelt|spelled spelt|spelled = soletrar
spend spent spent = gastar; passar (tempo)
spill spilt|spilled spilt|spilled = derramar
spin* spun spun = girar
spit* spat|spit spat|spit = cuspir
split* split split = dividir
spoil spoilt|spoiled spoilt|spoiled = estragar
spread spread spread = espalhar
spring sprang sprung = saltar; brotar
stand stood stood = ficar de pé; tolerar
steal stole stolen = roubar
stick stuck stuck = grudar; fincar
sting stung stung = picar (inseto)
stink stank stunk = feder
stride strode stridden = andar a passos largos
strike struck struck = golpear; entrar em greve
string strung strung = enfileirar
strive strove|strived striven|strived = esforçar-se
swear swore sworn = jurar; xingar
sweep swept swept = varrer
swell swelled swollen|swelled = inchar
swim* swam swum = nadar
swing swung swung = balançar
take took taken = pegar; levar
teach taught taught = ensinar
tear tore torn = rasgar
tell told told = contar, dizer
think thought thought = pensar
throw threw thrown = jogar, arremessar
thrust thrust thrust = empurrar com força
tread trod trodden = pisar
undergo underwent undergone = passar por, sofrer
understand understood understood = entender
undertake undertook undertaken = empreender
undo undid undone = desfazer
upset* upset upset = chatear; transtornar
wake woke woken = acordar
wear wore worn = vestir, usar (roupa)
weave wove woven = tecer
weep wept wept = chorar
win* won won = vencer
wind wound wound = enrolar; dar corda
withdraw withdrew withdrawn = retirar; sacar
withhold withheld withheld = reter
withstand withstood withstood = resistir a
wring wrung wrung = torcer
write wrote written = escrever
`;

const REGULAR = `
accept achieve add admire admit* adopt advise afford agree aim allow announce answer apologise appear apply appoint appreciate approach approve argue
arrange arrest arrive ask assess assist assume attach attack attempt attend attract avoid bake ban* bathe beg* behave believe belong benefit blame boil
book borrow bother breathe brush calculate call cancel% care carry cause celebrate challenge change charge chase chat* check cheer chew claim clarify
clean clear climb close collapse collect combine commit* communicate compare compete complain complete compose concentrate conclude conduct confess confirm
connect consider consist construct consult contain continue contribute control* convince cook cooperate copy correct cough count cover crash create criticise
cross cry cycle damage dance decide declare decline decorate decrease define delay delete deliver demand demonstrate deny depend derive describe deserve design
destroy detect determine develop die disagree disappear discover discuss dislike dismiss display distribute divide doubt download drag* dress drop* dry
earn educate elect embarrass emerge emphasise employ empty enable encourage end enjoy ensure enter entertain equip* escape establish estimate evaluate
examine exceed exchange excuse exist expand expect experience explain explode explore export express extend fail fancy fasten fetch file fill finish fire
fit* fix flash float flood flow focus fold follow force form found frighten fund gather generate glance grab* graduate greet grin* grip* guarantee guard
guess guide handle happen harm hate head heat help hesitate highlight hire hope host hug* hunt hurry identify ignore illustrate imagine implement imply
import impose improve include increase indicate influence inform inherit inject injure insist inspect install intend interpret interrupt interview introduce
invent invest investigate invite involve iron jog* join joke judge jump justify kick kill kiss knit* knock label% land last laugh launch lift like limit
link list listen live load locate lock look love maintain manage mark marry match matter measure melt mention migrate mind miss mix modify monitor move
murder name need negotiate nod* note notice obey object observe obtain occupy occur* offend offer omit* open operate oppose order organise own pack paint
panic^ park participate pass pause perceive perform permit* persuade phone pick place plan* plant play please plug* point polish pop* possess post postpone
pour practise pray predict prefer* prepare present preserve press pretend prevent print process produce program* promise promote protect protest provide
publish pull punish purchase push qualify question queue race rain raise reach react realise recall receive recognise recommend record recover recruit
recycle reduce refer* reflect refuse regret* reject relax release rely remain remember remind remove rent repair repeat replace reply report represent
request require rescue research reserve resign resist resolve respect respond rest restore retire return reveal review revise reward risk rob* rub* ruin
rule rush sail satisfy save scare schedule score scream search secure select separate serve settle share shave shelter shift shock shop* shout sign
signal% sketch skip* slip* smile smoke sneeze solve sort sound spare specify spot* stare start state stay steer step* stir* stop* store strengthen stress
stretch study submit* succeed suffer suggest suit supply support suppose surprise surround survive suspect suspend sustain switch talk tap* target taste
tease test thank threaten tick tie tip* tolerate touch tour trace trade train transfer* translate transport trap* travel% treat tremble trust try turn
type undermine unite unlock upgrade upload urge use value vanish vary visit vote wait walk wander want warn wash waste watch water wave weigh welcome
whisper whistle wipe wish wonder work worry wrap* yawn yell zip*
act assemble award board date depart exercise lower propose pump redecorate service tend update volunteer accompany acquire adapt adjust advertise allocate alter anticipate assign attribute authorise
`;

export interface Verb {
  base: string;
  /** Third person singular present. */
  s: string;
  /** Past simple forms (first = preferred in this book). */
  past: string[];
  /** Past participle forms. */
  pp: string[];
  /** -ing forms. */
  ing: string[];
  irregular: boolean;
  /** Portuguese gloss (irregular verbs; used in Appendix A). */
  pt?: string;
}

const VOWELS = 'aeiou';

function thirdPerson(base: string): string {
  if (base === 'be') return 'is';
  if (base === 'have') return 'has';
  if (/(s|x|z|ch|sh)$/.test(base)) return base + 'es';
  if (/(^|[^aeiou])o$/.test(base)) return base + 'es';
  if (/[^aeiou]y$/.test(base)) return base.slice(0, -1) + 'ies';
  return base + 's';
}

function ingForm(base: string, mark: string): string[] {
  if (base === 'be') return ['being'];
  if (mark === '*') return [base + base[base.length - 1] + 'ing'];
  if (mark === '%') return [base + base[base.length - 1] + 'ing', base + 'ing'];
  if (mark === '^') return [base + 'king'];
  if (base.endsWith('ie')) return [base.slice(0, -2) + 'ying'];
  if (/(ee|ye|oe)$/.test(base)) return [base + 'ing'];
  if (base.endsWith('e') && base.length > 2) return [base.slice(0, -1) + 'ing'];
  return [base + 'ing'];
}

function regularPast(base: string, mark: string): string[] {
  if (mark === '*') return [base + base[base.length - 1] + 'ed'];
  if (mark === '%') return [base + base[base.length - 1] + 'ed', base + 'ed'];
  if (mark === '^') return [base + 'ked'];
  if (base.endsWith('e')) return [base + 'd'];
  if (base.length > 1 && base.endsWith('y') && !VOWELS.includes(base[base.length - 2])) return [base.slice(0, -1) + 'ied'];
  return [base + 'ed'];
}

function parseIrregular(): Verb[] {
  return IRREGULAR.trim()
    .split('\n')
    .map((line) => {
      const [forms, pt] = line.split(' = ');
      const [rawBase, past, pp] = forms.trim().split(/\s+/);
      const mark = rawBase.endsWith('*') ? '*' : '';
      const base = rawBase.replace('*', '');
      return {
        base,
        s: thirdPerson(base),
        past: past.split('|'),
        pp: pp.split('|'),
        ing: ingForm(base, mark),
        irregular: true,
        pt: pt?.trim(),
      };
    });
}

function parseRegular(): Verb[] {
  return REGULAR.trim()
    .split(/\s+/)
    .map((raw) => {
      const mark = /[*%^]$/.test(raw) ? raw[raw.length - 1] : '';
      const base = mark ? raw.slice(0, -1) : raw;
      const past = regularPast(base, mark);
      return { base, s: thirdPerson(base), past, pp: past, ing: ingForm(base, mark), irregular: false };
    });
}

export const IRREGULAR_VERBS: Verb[] = parseIrregular();
export const REGULAR_VERBS: Verb[] = parseRegular();
export const VERBS: Verb[] = [...IRREGULAR_VERBS, ...REGULAR_VERBS];

const BY_BASE = new Map<string, Verb>();
for (const v of VERBS) if (!BY_BASE.has(v.base)) BY_BASE.set(v.base, v);

export function getVerb(base: string): Verb {
  const v = BY_BASE.get(base);
  if (!v) throw new Error(`Verb not in table: ${base}`);
  return v;
}

export function hasVerb(base: string): boolean {
  return BY_BASE.has(base);
}

/** Every inflected form in the table (used to stop real words being graded as spelling slips). */
export function allVerbForms(): Set<string> {
  const out = new Set<string>();
  for (const v of VERBS) {
    out.add(v.base);
    out.add(v.s);
    v.past.forEach((f) => out.add(f));
    v.pp.forEach((f) => out.add(f));
    v.ing.forEach((f) => out.add(f));
  }
  return out;
}
