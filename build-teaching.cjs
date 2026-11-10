const fs = require('node:fs'), assert = require('node:assert/strict'), {createHash} = require('node:crypto');
module.exports = function buildTeaching(bank, revision) {
  const byId = new Map(bank.map(q => [q.id, q]));
  const normalize = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const short = new Map();
  for (const q of bank) if (q.answer.length === 1) {
    const key = normalize(q.choices[q.answer[0]]);
    if (key.length > 2 && key.length <= 100 && !['true', 'false'].includes(key)) {
      if (!short.has(key)) short.set(key, []);
      short.get(key).push(q);
    }
  }
  const rules = [
    ['family-authority', /(?:family|relative|son|daughter|parent).*(?:overrule|override|decide|authorize|approve|permission|consent|supervis)|(?:ask|let|have).*(?:family|relative).*(?:choose|decision)/i, 'Knowing or supporting a client does not by itself give a relative authority to replace the client’s decision or authorize a worker’s task.', 'chapter-4-5/data.js:r06'],
    ['refusal', /(?:continue|proceed|finish|force|hold|restrain|persuad).*(?:refus|consent|agreed|client|bath|care|task)|(?:signed|agreement).*(?:cannot|must|continue)/i, 'An earlier agreement, a planned task or the worker’s preferred outcome does not settle a new refusal. Distinguish consent and client choice from simply completing care.', 'chapter-4-5/data.js:r04'],
    ['unauthorized-scope', /(?:diagnos|prescrib|interpret.*diagnos|change.*(?:care plan|treatment|dose)|revise.*(?:care plan|order)|independent.*(?:order|medical|treat))/i, 'Observation and reporting are different from independently diagnosing, interpreting medical information or changing authorized care. Check which responsibility this option gives the worker.', 'chapter-4-5/data.js:t08'],
    ['transfer-delegation', /(?:coworker|colleague|another worker|other client|second client).*(?:authorization|delegat|instructions|perform|same procedure)|(?:transfer|re delegate|redelegate).*(?:task|authorization|delegation)/i, 'Do not confuse knowing the steps with holding the required authorization for this worker and client. Passing instructions to a colleague does not establish a new delegation.', 'chapter-4-5/data.js:a10-07'],
    ['training-authorization', /(?:training|trained|course|experience|performed|taught|competent|competence|diagnosis).*(?:automatically|overrid|authoriz|every client|all clients|transfer|any task|permission|settles|without checking)/i, 'Training, experience and authorization are separate checks. Prior performance or a course does not by itself settle the current client, policy and role requirements.', 'chapter-4-5/data.js:d11'],
    ['nurse-policy', /(?:nurse|professional).*(?:overrides|override|because.*request|because.*asked)|(?:client|family|contract|payment|pay).*(?:authorize|authoriz|overrid|supervis|responsibility)/i, 'A request, contract or payment does not remove role and policy limits. Check the authorization and supervision that actually apply.', 'chapter-4-5/data.js:x10-01'],
    ['wait-to-report', /(?:wait|delay|finish|continue|next shift|shift change|end of.*shift|20 minutes|next.*meeting|only if|until).*(?:report|notify|mention|inform|falls|injur|harm)|report.*only if/i, 'The timing matters: postponing a relevant change or omission can leave the care team without information needed now. Follow the timely reporting route described in the source.', 'chapter-4-5/data.js:t10-13'],
    ['record-accuracy', /(?:record|document|chart|sign).*(?:as given|as completed|was completed|alter|regardless|even if|unknown|confidence|protected)|(?:hide|omit|alter|falsify).*(?:mistake|omission|record|documentation|error)/i, 'Documentation must reflect what is known and what actually occurred. Completing or altering a record cannot substitute for reporting and appropriate follow-up.', 'chapter-4-5/data.js:t10-13'],
    ['privacy-audience', /(?:share|discuss|disclos|tell|confirm|access).*(?:everyone|every|staff|coworker|colleague|nurse|friend|public|elevator|staff room|family|relative|visitor)|(?:job title|staff room|healthcare worker|health care worker).*(?:authoriz|automatically|permission|need to know)/i, 'A relationship, workplace or job title alone does not establish a need to know. Separate authorized, necessary care communication from casual disclosure.', 'chapter-4-5/data.js:v02'],
    ['digital-privacy', /(?:post|screenshot|record|film|photo|video|personal.*(?:phone|email|account)|journal|forward|send).*(?:client|resident|care|record|details|story|name|face|diagnos|information)|(?:omit|remove|cover).*(?:name|face)|(?:private|closed).*(?:account|group).*(?:authoriz|appropriate|any|all|permission)/i, 'Removing a name, using a private account or having a helpful purpose does not by itself make a care disclosure appropriate. Context and identifying details still matter.', 'chapter-4-5/data.js:v03'],
    ['deletion', /(?:delet|disappear|temporary|retain|copies|copy|forward).*(?:all|every|guarantee|once read|no.*consequence)|(?:private recipient|platform|sender).*(?:cannot copy|prevents|control.*interpret)/i, 'The original audience and the original copy do not determine every later recipient or consequence. Consider retention, forwarding and interpretation before relying on deletion or privacy settings.', 'main/chapter-23/data.js:c23_041'],
    ['boundary-needs', /(?:secret|off the clock|privately|private visits|home phone|friendship|extra pay|gift|tip|praise|gratitude|appreciat|needed|dependence).*(?:client|care|accept|worker|visit|agree)|(?:accept|stay|promise|give).*(?:gift|tip|number|social|private|off the clock)|(?:ask|make).*(?:client).*(?:validate|acknowledge|confidence|reassur|emotional needs)/i, 'Kindness does not require a private arrangement or making a client meet the worker’s personal needs. Keep the caring relationship within professional boundaries and policy.', 'chapter-3/data.js:b01'],
    ['independence', /(?:do|complete|put|assist|help|make).*(?:for the client|for him|for her|unnecessary help)|(?:independence|independent).*(?:failed|unnecessary|not part)|(?:increase|restore).*(?:dependence|worth)/i, 'Helping is not the same as taking over. Relate the amount of assistance to the client’s abilities, wishes and plan rather than the worker’s need to finish or feel useful.', 'chapter-4-5/data.js:r01'],
    ['untrained-care', /(?:try|perform|proceed|attempt|continue).*(?:carefully|from memory|unfamiliar|not.*train|client trusts|stable|straightforward|demonstrat|coac)|(?:client|family).*(?:show how|demonstrate.*technique|coach)/i, 'Confidence, a demonstration or reassurance does not establish safe competence. Identify the training or supervisory gap before attempting the task.', 'chapter-3/data.js:b05'],
    ['supervision', /(?:off site|off-site|no nurse|supervis|support).*(?:unnecessary|not.*need|assume|family|removes)|(?:nothing|none).*(?:authorized|taught|delegat)/i, 'Authorization is not the whole supervision check. Access to clear direction and suitable help still matters in the actual setting.', 'chapter-4-5/data.js:d10-17'],
    ['unsafe-restraint', /(?:tie|restraint|restrain|confiscat|hold.*still|remove.*walker|hide.*aid|prevent.*leav|move.*before|transfer alone|alone.*transfer)/i, 'A care or safety goal is not automatic permission to restrict a person or bypass safe procedures. Compare the proposed action with the consent, authority and safety limits in the source.', 'chapter-4-5/data.js:x5-06'],
    ['assumption-evidence', /(?:prove|proves|conclusive|conclusively|establishes|guarantee|necessarily|always|every|only).*(?:motive|feel|intention|personality|diagnos|agreement|safe|success|appropriate|cause|understand|care|benefit)|(?:assume|conclude).*(?:because|means|proves|definitely|all|every)/i, 'This option turns limited information into a stronger conclusion. Distinguish an observation or possible explanation from proof, and check the context before generalizing.', 'chapter-6/data.js:ch6-039'],
    ['intent-impact', /(?:intent|intention|calm|praise|completion|completed|outcome|agreement).*(?:proves|proof|guarantee|only|means|establish|no.*problem|no.*influence)|(?:only|all).*(?:intention|worker.s aim|client.s reaction)/i, 'An intention or overall outcome is only part of the reflection. Compare it with the person’s actual responses and the individual actions that may need improvement.', 'chapter-6/data.js:ch6-092'],
    ['reflection-blame', /(?:blame|irrational|unreasonable|personality|diagnos|prove.*right|hate dependence|attention seeking|stubborn|noncompliant|manipulative)/i, 'A label or assumed motive is not an objective account. Describe the evidence, examine the worker’s contribution and consider alternative interpretations before deciding what was learned.', 'chapter-6/data.js:ch6-136'],
    ['reflection-incomplete', /(?:only|entirely|exclude|ignore|replace|stop|no need|unnecessary|without|before).*(?:reflection|describe|description|emotion|feeling|learning|evidence|analysis|goal|strategy|plan|apply|action)/i, 'Reflection needs more than one isolated step. Connect the description and reactions to analysis, a justified goal and an approach whose effects can be reviewed.', 'chapter-6/data.js:ch6-138'],
    ['avoid-communication', /(?:stay silent|avoid.*communication|ignore.*request|ignore.*concern|stop reporting|avoid raising|not.*contribute|only.*regulated.*contribute)/i, 'Silence is not the same as a professional response. Relevant observations and concerns still need the appropriate respectful communication route.', 'chapter-4-5/data.js:s10-07'],
    ['conflict', /(?:gossip|take sides|uninvolved|complain.*client|criticiz.*client|insult|ridicule|sarcasm|sarcastic|argue.*parent)/i, 'Escalating criticism or involving the wrong audience does not resolve the issue professionally. Use respectful, relevant communication and the appropriate support route.', 'chapter-4-5/data.js:s10-04'],
    ['convenience', /(?:fastest|quickest|speed|convenien|easiest|shortest|schedule|arrival order|finish early|routine.*same|same.*routine)/i, 'Convenience and consistency do not by themselves decide care. Compare this option with the client’s needs, preferences and immediate risks identified in the source.', 'chapter-3/data.js:c22'],
    ['resume-honesty', /(?:exaggerat|misleading|conceal|omit.*job|remove.*dates|dates removed|change.*job title|copy.*strength|claim.*experience|guarantee.*offer|different account|not.*check)/i, 'An application should present relevant evidence truthfully. Tailoring the emphasis is different from changing facts, hiding requested history or inventing qualifications.', 'chapter-13/data.js:c13_47'],
    ['resume-relevance', /(?:longer paragraph|long paragraph|every.*dut|all.*dut|decorative|small font|tiny font|graphics|white space|unrelated|hobbies|fill.*space|only.*title|only.*start)/i, 'More detail or decoration does not necessarily show a better fit. Select relevant, accurate evidence and keep the presentation readable and consistent.', 'chapter-13/data.js:c13_52'],
    ['application-instructions', /(?:leave.*blank|see r[eé]sum|preferred format|paper copy|hard copy|every.*format|skip.*field|only.*contact)/i, 'The employer’s instructions and requested information matter. A familiar document or personal preference is not a substitute for completing the application as requested.', 'chapter-13/data.js:c13_75'],
    ['reference-permission', /(?:reference|supervisor).*(?:assume|guarantee|omit|without|every|write.*application)|(?:permission|agreement).*(?:covers every|all future)/i, 'A useful reference needs permission, accurate contact information and context for the current application. A past agreement is not a guarantee of an offer or every future arrangement.', 'chapter-13/data.js:c13_65'],
    ['employment-terms', /(?:benefit|coverage|contract|probation|offer|employment).*(?:guarantee|identical|always|automatically|no further|nothing|only|assume)|(?:nothing|only).*(?:sign|shift|title|uniform|benefit|pay|start)/i, 'Employment terms are specific to the offer or plan. Clarify conditions, eligibility and written expectations instead of assuming the title or another worker’s experience settles them.', 'chapter-13/data.js:c13_98'],
    ['interview-listening', /(?:answer.*before|speak faster|memorized|memorise|memorize|interrupt|same questions again|ignore.*question|one.*answer|only.*senior|first name)/i, 'Professional interview communication depends on listening to the actual question and responding appropriately to the interviewer, not merely delivering a prepared response.', 'chapter-13/data.js:c13_86'],
    ['online-health-evidence', /(?:popular|friends|agreement|professional language|confident|positive|supportive|healthcare worker|health care worker|shared|lived experience).*(?:accurate|reliable|evidence|truth|true|source|all advice)|(?:count|enough).*(?:comments|agreement)/i, 'Popularity, confidence and a supportive tone are different from evidence for a health claim. Check accuracy and source quality rather than treating social approval as validation.', 'main/chapter-23/data.js:c23_089'],
    ['digital-access', /(?:access|connection|online|internet|video|social media).*(?:removes|guarantee|equal|every|all|eliminat|automatically|necessarily|only)/i, 'Access to a tool is not proof of understanding, equal participation or benefit. Consider the person’s skills, preferences, privacy and the actual effect of the communication.', 'main/chapter-23/data.js:c23_009'],
    ['message-meaning', /(?:silence|reply|delivery receipt|reader|tone|words|intention|intended|feedback).*(?:proof|proves|guarantee|must|necessarily|only|automatically|prevent|determine)/i, 'Sending, receiving, understanding and agreeing are different. The sender’s intention alone cannot establish the receiver’s meaning or response.', 'main/chapter-23/data.js:c23_018'],
    ['bullying-context', /(?:bully|bullying|observer|victim|perpetrator|aggression|threat|identity|anonymous).*(?:only|every|automatically|unaffected|cannot|requires|always)|(?:private message|supervisor|unknown perpetrator)/i, 'Assess the behaviour and context rather than relying on identity, job title or whether a message is private. Those features alone do not define the bullying roles or remove potential harm.', 'main/chapter-23/data.js:c23_026'],
    ['universal-coverage', /(?:Canada Health Act|Medicare|federal|provincial|insurance|home care|home-care|equipment).*(?:every|identical|all|only|guarantee|full cost|directly|automatically|same)/i, 'Distinguish the system’s broad framework from the eligibility and services of a particular program. A public plan does not make every service or local arrangement identical.', 'chapter-3/data.js:h18']
  ];
  const conceptAliases = {
    'long term care': 'chapter-3/data.js:a03', 'long term complex care': 'chapter-3/data.js:a03',
    'retirement home': 'chapter-3/data.js:c34', 'retirement residence': 'chapter-3/data.js:c14',
    'adult day program': 'chapter-3/data.js:c11', 'community day program': 'chapter-3/data.js:c21',
    'rehabilitation services': 'chapter-3/data.js:c04', 'routine home care': 'chapter-3/data.js:h11',
    'acute care hospital': 'chapter-3/data.js:a01', 'health promotion': 'chapter-3/data.js:h10',
    'professional therapy': 'chapter-3/data.js:h17', 'professional services': 'chapter-3/data.js:h17',
    'supplementary benefits': 'chapter-3/data.js:h22', 'belief': 'chapter-4-5/data.js:e02',
    'morals': 'chapter-4-5/data.js:e04',
    'libel': 'chapter-4-5/data.js:t10', 'slander': 'chapter-4-5/data.js:x5-07'
  };
  for (const [term, id] of Object.entries(conceptAliases)) {assert(byId.has(id), id); if (!short.has(term)) short.set(term, [byId.get(id)]);}
  for (const rule of rules) assert(byId.has(rule[3]), 'Missing teaching evidence: ' + rule[3]);
  const teaching = {}, tally = {}, remaining = [];
  for (const q of bank) {
    const options = q.choices.map((choice, index) => {
      let item;
      if (q.answer.includes(index)) item = {kind: 'correct', note: 'This belongs to the correct answer for this question. Use the source explanation to connect the answer to the decisive detail in the prompt.', evidence: [q.id]};
      else if (q.why?.some(w => w.choice === choice)) item = {kind: 'original-choice-feedback', note: q.why.find(w => w.choice === choice).text, evidence: [q.id]};
      else if (q.choices.length === 2) item = {kind: 'statement-contrast', note: `Choosing “${choice}” reverses the course’s classification of this statement. The source explanation below gives the reason for “${q.choices[q.answer[0]]}”.`, evidence: [q.id]};
      else {
        const key = normalize(choice.replace(/[.;]$/, '').replace(/\s+(?:alone|only)\.?$/i, ''));
        let candidates = short.get(key);
        if (!candidates) {
          const prefix = normalize(choice.split(/[,—]|\bbecause\b/)[0].replace(/\s+only\.?$/i, ''));
          if (prefix.length > 2) candidates = short.get(prefix);
        }
        if (candidates?.some(other => other.id !== q.id)) {
          const candidate = candidates.filter(other => other.id !== q.id).sort((a, b) => Number(b.group === q.group) - Number(a.group === q.group) || a.explain.length - b.explain.length)[0];
          item = {kind: 'concept-contrast', note: 'This names a different concept or category. Compare the related course example with the requirement of the present question.' + (/because/i.test(choice) ? ' The justification attached to a concept must also fit; naming a real principle does not make that justification correct.' : ''), evidence: [q.id, candidate.id], comparisonId: candidate.id};
        } else {
          const applicable = rules.filter(([tag]) => {
            if (/^(resume-|application-|reference-|employment-|interview-)/.test(tag)) return q.group === 'Chapter 13';
            if (/^(digital-access|online-health|bullying-context)/.test(tag)) return q.group === 'Chapter 23';
            if (/^(reflection-|intent-impact)/.test(tag)) return q.group === 'Chapter 6';
            if (tag === 'universal-coverage') return ['Chapter 2', 'Chapter 3'].includes(q.group);
            if (tag === 'convenience') return !['Chapter 13', 'Chapter 23'].includes(q.group);
            return true;
          }).sort((a, b) => q.group === 'Chapter 13' ? Number(/^(resume-|application-|reference-|employment-|interview-)/.test(b[0])) - Number(/^(resume-|application-|reference-|employment-|interview-)/.test(a[0])) : q.group === 'Chapter 23' ? Number(/^(digital-|online-health|bullying|message-|deletion)/.test(b[0])) - Number(/^(digital-|online-health|bullying|message-|deletion)/.test(a[0])) : 0);
          const match = applicable.find(([tag, pattern]) => pattern.test(choice) && (tag !== 'refusal' || /refus|consent|declin|\bstop\b/i.test(q.prompt + ' ' + choice)));
          if (match) item = {kind: match[0], note: match[2], evidence: [...new Set([q.id, match[3]])]};
          else {
            const focus = /\b(year|how many|how much|number|percentage)\b/i.test(q.prompt) ? 'the specific value or event asked about' : /\b(sequence|set|group|pair|list|five|four|three)\b/i.test(q.prompt) ? 'the exact members, order or pairing in the taught set' : /\b(should|response|action|next step|approach|do first|best.*step)\b/i.test(q.prompt) ? 'the action and conditions required in this situation' : 'the particular definition, category or distinction in the prompt';
            item = {kind: 'source-contrast', note: `The difference to study is ${focus}. “${choice}” changes that requirement; the keyed response is “${q.answer.map(n => q.choices[n]).join('; ')}”.`, evidence: [q.id]};
            remaining.push({id: q.id, choice, lesson: q.explain});
          }
        }
      }
      tally[item.kind] = (tally[item.kind] || 0) + 1;
      assert(item.note && item.evidence.length && item.evidence.every(id => byId.has(id)), q.id);
      return item;
    });
    teaching[q.id] = {options, sourcePrecision: /(?:slides?\s+\d|\bp\.\s*\d|\bpp\.\s*\d|pages?\s+\d|section\s*\d)/i.test(q.source) ? 'recorded-locator' : 'section-level'};
  }
  const teachingRevision = createHash('sha256').update(JSON.stringify(teaching)).digest('hex').slice(0, 16);
  fs.writeFileSync('super-quiz/teaching.js', 'window.TEACHING_REVISION=' + JSON.stringify(teachingRevision) + ';\nwindow.TEACHING={};\n');
  for (let i = 0; i < 8; i++) fs.writeFileSync('super-quiz/teaching-' + (i + 1) + '.js', 'Object.assign(window.TEACHING,' + JSON.stringify(Object.fromEntries(bank.slice(i * 95, (i + 1) * 95).map(q => [q.id, teaching[q.id]]))) + ');\n');
  fs.writeFileSync('super-quiz/teaching-coverage.json', JSON.stringify({bankRevision: revision, teachingRevision, questions: bank.length, options: bank.reduce((n, q) => n + q.choices.length, 0), completeQuestions: Object.keys(teaching).length, methods: tally, items: bank.map(q => ({id: q.id, choices: q.choices.length, lessons: teaching[q.id].options.length, scope: q.group + ' / ' + q.topic, source: q.source, sourcePrecision: teaching[q.id].sourcePrecision}))}, null, 2) + '\n');
  fs.writeFileSync('../teaching-review-needed.json', JSON.stringify(remaining, null, 2));
  console.log(JSON.stringify({questions: bank.length, methods: tally, sourceComparisons: remaining.length}));
};
