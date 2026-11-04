window.ARCADE = {
  "modes": [
    {
      "id": "medicare",
      "icon": "◎",
      "title": "Medicare Match",
      "subtitle": "Connect the rules, roles and milestones.",
      "detail": "Canada’s Medicare system, the Canada Health Act, government responsibilities and key dates.",
      "interaction": "Principle and role match",
      "topic": "Chapter 2 · Medicare"
    },
    {
      "id": "pathways",
      "icon": "⇢",
      "title": "Health Pathways",
      "subtitle": "Follow care from prevention to specialized treatment.",
      "detail": "Health-care levels, home care, prevention, supplementary coverage and system pressures.",
      "interaction": "Clue-based choices",
      "topic": "Chapter 2 · Care delivery"
    },
    {
      "id": "care",
      "icon": "✦",
      "title": "Care Type Rally",
      "subtitle": "Read the clue, name the care goal.",
      "detail": "Acute, subacute, long-term, respite, rehabilitation, restorative, palliative and end-of-life care.",
      "interaction": "Fast multiple choice",
      "topic": "Care types"
    },
    {
      "id": "setting",
      "icon": "⌖",
      "title": "Setting Sorter",
      "subtitle": "Community or site-based? Place each setting.",
      "detail": "Hospitals, long-term care, assisted living, homes, group homes, retirement homes and day programs.",
      "interaction": "Two-choice sorting",
      "topic": "Workplace settings"
    },
    {
      "id": "daily",
      "icon": "↗",
      "title": "Daily Living Dash",
      "subtitle": "Separate personal care from independent-living tasks.",
      "detail": "Spot the difference between ADLs and IADLs in everyday examples.",
      "interaction": "Quick classification",
      "topic": "ADLs & IADLs"
    },
    {
      "id": "acuity",
      "icon": "⌁",
      "title": "Acuity Ladder",
      "subtitle": "Match client needs to the right care context.",
      "detail": "Practice acute, subacute and ongoing care distinctions with case clues.",
      "interaction": "Case-based choices",
      "topic": "Care types"
    },
    {
      "id": "safety",
      "icon": "◈",
      "title": "Safe Practice Scenarios",
      "subtitle": "Choose the safest next step within the HCA role.",
      "detail": "Care plans, supervision, urgent changes, teamwork and respectful care.",
      "interaction": "Decision scenarios",
      "topic": "Safety & role"
    },
    {
      "id": "boundaries",
      "icon": "♡",
      "title": "Boundary Boss",
      "subtitle": "Keep kindness warm and professional.",
      "detail": "Work through privacy, gifts, extra duties and informal home-care moments.",
      "interaction": "What would you do?",
      "topic": "Boundaries"
    }
  ],
  "topics": [
    "Canada’s Medicare",
    "Canada Health Act",
    "Indigenous health",
    "Care delivery",
    "Home care",
    "Health promotion & prevention",
    "Health system & coverage",
    "Care types",
    "Workplace settings",
    "ADLs & IADLs",
    "Benefits & challenges",
    "Safety & role",
    "Boundaries"
  ],
  "questions": [
    {
      "id": "c01",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client is admitted after a sudden illness for urgent assessment and stabilization. Which care type names this phase?",
      "choices": [
        "Acute care",
        "Subacute care",
        "Rehabilitation",
        "Long-term care"
      ],
      "answer": 0,
      "explain": "Acute care addresses sudden illness or injury and commonly focuses on treatment and stabilization before discharge when appropriate.",
      "source": "Workplace Setting slides 7, 22–25; Part Two notes"
    },
    {
      "id": "c02",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "After a serious illness, a client is stable but cannot yet go home after surgery. They still need inpatient recovery care, frequent physiotherapy, dressing changes, and complex procedures. Which care category best fits?",
      "choices": [
        "Subacute (complex continuing) care",
        "Long-term care",
        "Restorative care alone",
        "Respite care"
      ],
      "answer": 0,
      "explain": "Subacute care—also called complex continuing, convalescent, or transitional care—supports inpatient recovery after surgery, injury, acute illness, or an exacerbation of disease. A stable client may still need complex equipment or procedures before discharge.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 36)"
    },
    {
      "id": "c03",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A family caregiver will be away for a weekend, and the client needs temporary support during that time. Which care purpose best fits?",
      "choices": [
        "Respite care",
        "Rehabilitation",
        "Restorative care",
        "Long-term care"
      ],
      "answer": 0,
      "explain": "Respite care provides temporary relief for caregivers. It describes a service goal, which may be offered in different settings.",
      "source": "First-Half Quiz Study Guide, section 9; Workplace Setting slide 17"
    },
    {
      "id": "c04",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "After a fracture has been treated, a client practises walking and transfers to regain abilities lost during the injury. Which care goal is the best match?",
      "choices": [
        "Rehabilitation",
        "Restorative care",
        "Subacute care",
        "Respite care"
      ],
      "answer": 0,
      "explain": "The class guide distinguishes rehabilitation as helping a person regain abilities after illness or injury.",
      "source": "First-Half Quiz Study Guide, section 9; Workplace Setting slides 3, 17"
    },
    {
      "id": "c05",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client has an illness that cannot be cured. The team’s stated goal is to improve quality of life by managing pain and other distressing symptoms. The client has not said that all disease-controlling treatment has stopped. Which approach is defined by this goal?",
      "choices": [
        "Palliative care",
        "End-of-life care",
        "Respite care",
        "Subacute care"
      ],
      "answer": 0,
      "explain": "Palliative care is for people living with an incurable illness and aims to improve quality of life by managing pain and other distressing symptoms. End-of-life care is specifically described as support after treatment to cure or control the disease has stopped; the two terms should not be treated as interchangeable.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 37)"
    },
    {
      "id": "c06",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client has stopped treatment intended to cure or control the disease. The plan includes physical, emotional, social, and spiritual support for the client and support for family members. Which term best matches this description?",
      "choices": [
        "End-of-life care",
        "Palliative care alone",
        "Respite care",
        "Rehabilitation services"
      ],
      "answer": 0,
      "explain": "End-of-life care is defined around stopping treatment to cure or control the disease and includes physical, emotional, social, and spiritual support for the person and family. It may include palliative, supportive, and hospice care and uses an interdisciplinary approach.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 37)"
    },
    {
      "id": "c07",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "After illness, a client is encouraged to rebuild daily routines and regain as much independence as possible. Which care goal most directly names that aim?",
      "choices": [
        "Restorative care",
        "Respite care",
        "Palliative care",
        "Acute care"
      ],
      "answer": 0,
      "explain": "Restorative care aims to re-establish the client’s sense of independence to their greatest potential. Rehabilitation overlaps in purpose but refers to methods, therapies, and educational programs used to restore or improve independence and functional abilities.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 36)"
    },
    {
      "id": "c08",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A person is admitted to hospital after a stroke and needs immediate assessment and treatment. Which care type best describes the admission?",
      "choices": [
        "Acute care",
        "Subacute care",
        "Rehabilitation",
        "Long-term care"
      ],
      "answer": 0,
      "explain": "The slides list stroke, heart attack, uncontrolled pain and surgical intervention among reasons a client may be admitted to acute care.",
      "source": "Workplace Setting slide 24"
    },
    {
      "id": "c09",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "One client’s condition appeared suddenly and has lasted six weeks. Another client’s illness began gradually and requires ongoing management, with no predictable worsening pattern. Which classification fits the two conditions, in order?",
      "choices": [
        "Acute; chronic",
        "Chronic; acute",
        "Subacute; chronic",
        "Acute; subacute"
      ],
      "answer": 0,
      "explain": "An acute illness appears suddenly and usually lasts less than three months. A chronic illness is ongoing and gradual in onset; it may or may not worsen over time. Duration alone does not turn a gradual, persistent illness into an acute one.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 36)"
    },
    {
      "id": "c10",
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client has a terminal diagnosis and is no longer seeking life-prolonging care. Which service could provide care at home, in a live-in setting, or as an inpatient while supporting the whole person?",
      "choices": [
        "Hospice care",
        "Respite care",
        "Rehabilitation services",
        "Acute care"
      ],
      "answer": 0,
      "explain": "Hospice is a type of palliative care for a client with a terminal diagnosis who is no longer seeking life-prolonging care. It addresses medical, emotional, social, and spiritual needs and may be delivered at home, in a live-in facility, or as inpatient care.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 37)"
    },
    {
      "id": "s01",
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "sort",
      "prompt": "A person is admitted to a hospital ward for assessment and treatment of an acute illness. Is this workplace site-based or community-based?",
      "choices": [
        "Site-based",
        "Community-based"
      ],
      "answer": 0,
      "explain": "The slides describe a hospital as a site for clients with acute illnesses or injuries who need admission and care, commonly on a relatively short-term basis.",
      "source": "Workplace Setting slide 7"
    },
    {
      "id": "s02",
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "sort",
      "prompt": "A client lives in an assisted-living residence and receives meals, supervision and help with some daily tasks while maintaining independence. Is this service setting community-based or site-based?",
      "choices": [
        "Community-based",
        "Site-based"
      ],
      "answer": 0,
      "explain": "Assisted-living sites are described as community-based services. Their support may include supervision, meals and housekeeping; 24-hour supervision is not the same as 24-hour nursing.",
      "source": "Workplace Setting slide 10; First-Half Quiz Study Guide, section 8"
    },
    {
      "id": "s03",
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "sort",
      "prompt": "A nursing home provides ongoing 24-hour professional nursing for residents who cannot live independently. Is this workplace site-based or community-based?",
      "choices": [
        "Site-based",
        "Community-based"
      ],
      "answer": 0,
      "explain": "The slides classify long-term or complex care among site-based settings and describe 24-hour nursing care for people unable to live independently.",
      "source": "Workplace Setting slides 8, 18"
    },
    {
      "id": "s04",
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "sort",
      "prompt": "A support worker visits a client’s own apartment for scheduled personal care and authorized home-management tasks. Is this service setting community-based or site-based?",
      "choices": [
        "Community-based",
        "Site-based"
      ],
      "answer": 0,
      "explain": "The client’s home is described as the most common community-based setting. Home care can include personal care, ADLs and home management within employer policy.",
      "source": "Workplace Setting slides 4–6"
    },
    {
      "id": "s05",
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "sort",
      "prompt": "Several people share a home in their neighbourhood and receive supervision and support there. Is this service setting community-based or site-based?",
      "choices": [
        "Community-based",
        "Site-based"
      ],
      "answer": 0,
      "explain": "A group home is a live-in facility, and it is also listed among community-based settings and services. Here the question asks how the setting is classified in the community-versus-facility service model; the fact that people live there does not automatically make it facility-based care.",
      "source": "Chapter 3, “Working in Community-Based Settings” and “Group Homes” (pp. 37, 40)"
    },
    {
      "id": "s06",
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "sort",
      "prompt": "A client attends a daytime program for activities, personal assistance and social contact, then returns home. Regardless of which building hosts it, is the service model community-based or site-based?",
      "choices": [
        "Community-based",
        "Site-based"
      ],
      "answer": 0,
      "explain": "Community day programs provide daytime services. They may be hosted in different kinds of buildings, but the program supports community participation.",
      "source": "Workplace Setting slides 14–15"
    },
    {
      "id": "s07",
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "sort",
      "prompt": "Residents in a retirement home mainly manage their own personal care and receive accommodation, meals and limited support. Is this service setting community-based or site-based?",
      "choices": [
        "Community-based",
        "Site-based"
      ],
      "answer": 0,
      "explain": "A retirement home is a live-in facility, but the chapter also describes retirement homes as community-based settings/services. Classify the service model named in the question, not simply whether the building provides accommodation.",
      "source": "Chapter 3, “Working in Community-Based Settings” and “Retirement Residences” (pp. 37–38)"
    },
    {
      "id": "s08",
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "sort",
      "prompt": "A hospital’s rehabilitation unit provides care after a client’s acute needs ease. Is the workplace itself site-based or community-based, regardless of the type of care delivered there?",
      "choices": [
        "Site-based",
        "Community-based"
      ],
      "answer": 0,
      "explain": "The slides identify hospitals and other medical sites as site-based workplaces, even though they may provide several types of care.",
      "source": "Workplace Setting slides 7, 17"
    },
    {
      "id": "d01",
      "mode": "daily",
      "topic": "ADLs & IADLs",
      "format": "sort",
      "prompt": "A client needs hands-on help to bathe but manages household chores independently. How is bathing classified?",
      "choices": [
        "ADL",
        "IADL"
      ],
      "answer": 0,
      "explain": "Bathing is basic personal care, so it is an activity of daily living (ADL).",
      "source": "First-Half Quiz Study Guide, section 7"
    },
    {
      "id": "d02",
      "mode": "daily",
      "topic": "ADLs & IADLs",
      "format": "sort",
      "prompt": "A client can shop and prepare meals but needs help tracking bills and planning a monthly budget. How is budgeting classified?",
      "choices": [
        "ADL",
        "IADL"
      ],
      "answer": 1,
      "explain": "Managing money is a more complex task involved in independent living, so it is an instrumental activity of daily living (IADL).",
      "source": "First-Half Quiz Study Guide, section 7"
    },
    {
      "id": "d03",
      "mode": "daily",
      "topic": "ADLs & IADLs",
      "format": "sort",
      "prompt": "A client needs physical assistance to move from bed to a chair. How is this transfer classified?",
      "choices": [
        "ADL",
        "IADL"
      ],
      "answer": 0,
      "explain": "The class guide groups transferring with basic personal-care activities, making it an ADL.",
      "source": "First-Half Quiz Study Guide, section 7"
    },
    {
      "id": "d04",
      "mode": "daily",
      "topic": "ADLs & IADLs",
      "format": "sort",
      "prompt": "A client can dress and bathe independently but needs help getting groceries from the store. How is grocery shopping classified?",
      "choices": [
        "ADL",
        "IADL"
      ],
      "answer": 1,
      "explain": "Shopping is part of managing an independent life and household, so it is an IADL.",
      "source": "First-Half Quiz Study Guide, section 7"
    },
    {
      "id": "d05",
      "mode": "daily",
      "topic": "ADLs & IADLs",
      "format": "sort",
      "prompt": "A client chooses their own clothing but needs help putting it on and fastening it. How is dressing classified?",
      "choices": [
        "ADL",
        "IADL"
      ],
      "answer": 0,
      "explain": "Dressing is basic personal care and is an ADL.",
      "source": "First-Half Quiz Study Guide, section 7"
    },
    {
      "id": "d06",
      "mode": "daily",
      "topic": "ADLs & IADLs",
      "format": "sort",
      "prompt": "A client eats independently but needs support planning and cooking a meal. How is meal preparation classified?",
      "choices": [
        "ADL",
        "IADL"
      ],
      "answer": 1,
      "explain": "Meal planning and cooking are household-management tasks, so the study guide lists them as IADLs.",
      "source": "First-Half Quiz Study Guide, section 7"
    },
    {
      "id": "d07",
      "mode": "daily",
      "topic": "ADLs & IADLs",
      "format": "sort",
      "prompt": "A client needs assistance using the toilet but manages laundry independently. How is toileting classified?",
      "choices": [
        "ADL",
        "IADL"
      ],
      "answer": 0,
      "explain": "Toileting is basic personal care and is an ADL.",
      "source": "First-Half Quiz Study Guide, section 7"
    },
    {
      "id": "d08",
      "mode": "daily",
      "topic": "ADLs & IADLs",
      "format": "sort",
      "prompt": "A client manages personal hygiene independently but needs help with laundry and housekeeping. How are those household tasks classified?",
      "choices": [
        "ADL",
        "IADL"
      ],
      "answer": 1,
      "explain": "Laundry and housekeeping support independent living and are IADLs in the class materials.",
      "source": "First-Half Quiz Study Guide, section 7"
    },
    {
      "id": "a01",
      "mode": "acuity",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client develops a sudden, serious change that needs urgent assessment and treatment. Which care setting best fits this immediate need?",
      "choices": [
        "Hospital / acute care",
        "Subacute care",
        "Assisted living",
        "Routine home care"
      ],
      "answer": 0,
      "explain": "The hospital is described as a site for acute illnesses or injuries requiring admission and care. HCAs should follow team instructions and report changes promptly.",
      "source": "Workplace Setting slides 7, 24; Part Two notes, section 3"
    },
    {
      "id": "a02",
      "mode": "acuity",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client’s emergency has been stabilized, but active treatment and recovery continue at a lower intensity before a safe discharge. Which care phase best fits?",
      "choices": [
        "Subacute care",
        "Rehabilitation",
        "Respite care",
        "Long-term care"
      ],
      "answer": 0,
      "explain": "Subacute care is described in the class guide as continued recovery or treatment after intensive acute needs decrease and before safe discharge.",
      "source": "First-Half Quiz Study Guide, section 10"
    },
    {
      "id": "a03",
      "mode": "acuity",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client cannot live independently and requires ongoing 24-hour professional nursing. Which setting best matches that level of support?",
      "choices": [
        "Long-term / complex care",
        "Assisted living",
        "Adult day program",
        "Home care"
      ],
      "answer": 0,
      "explain": "Long-term or complex care is for people who cannot live independently and need 24-hour nursing services. It offers a higher level of care than retirement homes and assisted living.",
      "source": "Workplace Setting slides 8, 18–20"
    },
    {
      "id": "a04",
      "mode": "acuity",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client needs housing, supervision and help with some daily activities but does not need 24-hour professional nursing. Which setting is the closest match?",
      "choices": [
        "Assisted living",
        "Long-term care",
        "Retirement home",
        "Adult day program"
      ],
      "answer": 0,
      "explain": "The class guide contrasts assisted living, which supports independence with daily assistance, with long-term care’s more extensive ongoing care and 24-hour professional nursing.",
      "source": "Workplace Setting slide 10; First-Half Quiz Study Guide, section 8"
    },
    {
      "id": "a05",
      "mode": "acuity",
      "topic": "Care types",
      "format": "choice",
      "prompt": "You are assigned to a specialized care unit, but you have not worked with its procedures before. What should you confirm before providing care?",
      "choices": [
        "The unit’s orientation, required training and assigned role for each task",
        "Whether a coworker has ever done the task, even if it is outside your training",
        "Whether the family prefers you to proceed without checking the care plan",
        "Whether the task can be completed quickly enough to skip supervision"
      ],
      "answer": 0,
      "explain": "The slides note that some support workers may require additional education or training for specialized settings. Follow the employer’s policies and assigned role.",
      "source": "Workplace Setting slide 20"
    },
    {
      "id": "a06",
      "mode": "acuity",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A client has been admitted to hospital several times, and their support needs may have changed. What is the most appropriate next step?",
      "choices": [
        "Request a needs assessment with the case manager or social worker to consider suitable supports.",
        "Move the client directly to long-term care because repeated admissions prove they cannot return home.",
        "Stop existing home-care services until the client chooses a new residence.",
        "Choose a setting based mainly on the client’s age."
      ],
      "answer": 0,
      "explain": "The notes describe assessment by a case manager or social worker, who may consider more home support, assisted living, a group home or long-term care depending on needs.",
      "source": "Part Two notes, section 2"
    },
    {
      "id": "ss01",
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "During care, a client becomes more confused and unsteady than usual. What is the safest response within the HCA role?",
      "choices": [
        "Protect immediate safety, stay with the client and promptly report the change to the nurse or supervisor.",
        "Finish the planned task first, then report the change if it continues.",
        "Decide what caused the change and adjust the care plan.",
        "Ask another client whether this behaviour is typical."
      ],
      "answer": 0,
      "explain": "The class notes say to recognize and promptly report changes, prioritize immediate safety and follow team instructions. HCAs do not independently diagnose or change the plan.",
      "source": "Part Two notes, section 3"
    },
    {
      "id": "ss02",
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "A client says their IV tubing is uncomfortable and asks you to adjust it. What should you do?",
      "choices": [
        "Do not adjust or disconnect the IV; promptly notify the nurse and follow instructions within your role.",
        "Change the flow slightly if the client says that helped before.",
        "Disconnect and reconnect the tubing without changing the setting.",
        "Ask the client to reposition the tubing themselves."
      ],
      "answer": 0,
      "explain": "The class notes say nurses and authorized clinicians handle IV therapy. An HCA should not independently manage IV lines and should report the concern to the nurse.",
      "source": "Part Two notes, section 3"
    },
    {
      "id": "ss03",
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "A resident falls while attempting a transfer. Which response best supports safety and proper reporting?",
      "choices": [
        "Stay with the resident, call for appropriate help, follow the fall procedure, then document and report objectively.",
        "Help the resident stand if they say they feel fine, then mention it at shift change.",
        "Move the resident to bed before notifying anyone so the hallway is clear.",
        "Record what you think caused the fall so the team has a complete explanation."
      ],
      "answer": 0,
      "explain": "The class scenario emphasizes safety and assessment, notifying a supervisor, truthful documentation and an incident report after a fall.",
      "source": "Part Two notes, Assignment 1 scenario 4"
    },
    {
      "id": "ss04",
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "A colleague proposes tying a resident with dementia to a chair because the resident wanders. What is the safest response?",
      "choices": [
        "Do not use an unauthorized restraint; stay attentive, seek immediate team support and report the concern.",
        "Use the restraint briefly while remaining in the room.",
        "Ask the family to authorize the restraint verbally.",
        "Try the restraint first and document it if it seems to work."
      ],
      "answer": 0,
      "explain": "The course scenario says not to use unauthorized restraint. Protect dignity, seek support and report the unsafe suggestion through appropriate channels.",
      "source": "Part Two notes, Assignment 1 scenario 3"
    },
    {
      "id": "ss05",
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "A client requests a household task that is not in the care plan and may fall outside your assigned duties. What is the best response?",
      "choices": [
        "Explain that you need to follow the care plan and agency policy, then check with the supervisor.",
        "Do the task once because it seems harmless, then ask about it later.",
        "Ask the family to approve it so the plan does not need to change.",
        "Add the task to the care plan because the client requested it."
      ],
      "answer": 0,
      "explain": "The notes stress following policy, care plans, training, competence and supervision. A caring relationship does not authorize extra duties.",
      "source": "First-Half Quiz Study Guide, section 11; Part Two notes, section 5"
    },
    {
      "id": "ss06",
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "Several clients need care at once, and one transfer requires two workers. What is the safest way to manage the competing needs?",
      "choices": [
        "Prioritize immediate risks, coordinate with the team and get the second worker before starting the transfer.",
        "Complete the transfer alone so the client is not kept waiting.",
        "Do routine tasks first because they take less time, then reassess urgent needs.",
        "Promise each client an immediate visit before checking staff availability."
      ],
      "answer": 0,
      "explain": "The instructor emphasized prioritizing client needs and asking for help when necessary. Work with colleagues and follow transfer instructions.",
      "source": "HCA 200 Introduction study chat; Part Two notes, section 3"
    },
    {
      "id": "ss07",
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "A reporter asks you for information about a former client. What is the appropriate response?",
      "choices": [
        "Protect the person’s confidentiality and refer the reporter to an authorized contact.",
        "Confirm only details that seem harmless, such as the person’s former unit.",
        "Share information if the reporter promises not to publish it.",
        "Confirm the person received care but withhold the diagnosis."
      ],
      "answer": 0,
      "explain": "The course ethical scenario directs students to protect confidentiality and refer media inquiries to an authorized contact.",
      "source": "Part Two notes, Assignment 1 scenario 1"
    },
    {
      "id": "b01",
      "mode": "boundaries",
      "topic": "Boundaries",
      "format": "scenario",
      "prompt": "After a scheduled home-care visit ends, a client who seems lonely invites you to stay for an unpaid chat. What is the most professional response?",
      "choices": [
        "Respond kindly, keep to the authorized visit and care plan, and discuss ongoing social-support needs with the team.",
        "Stay off the clock if the client says they have no one else to talk to.",
        "Promise to return privately so the client has reliable company.",
        "Avoid documenting or discussing the request to protect the client’s feelings."
      ],
      "answer": 0,
      "explain": "Home care takes place in a private, informal-feeling space, so boundaries can be harder to maintain. Kindness and clear professional limits can coexist.",
      "source": "HCA 200 Introduction study chat; First-Half Quiz Study Guide, section 11"
    },
    {
      "id": "b02",
      "mode": "boundaries",
      "topic": "Boundaries",
      "format": "scenario",
      "prompt": "A client’s relative asks you to send health updates from your personal phone. What should guide your response?",
      "choices": [
        "Check consent, confidentiality rules and agency communication policy; use authorized channels and involve the care team.",
        "Send the update if the relative knows the client’s diagnosis.",
        "Share only brief details and delete the message afterward.",
        "Post a general update in the family chat without using the client’s name."
      ],
      "answer": 0,
      "explain": "Confidentiality and employer policy guide information sharing. Direct health updates should go through authorized channels, not a personal informal arrangement.",
      "source": "Part Two notes, sections 5 and 6"
    },
    {
      "id": "b03",
      "mode": "boundaries",
      "topic": "Boundaries",
      "format": "scenario",
      "prompt": "A family requests extra cleaning that is not assigned in the care plan. What is the best response?",
      "choices": [
        "Explain your assigned duties respectfully and check with the supervisor about the request.",
        "Do it once because the family is present and can supervise.",
        "Trade the extra cleaning for another task the client does not need.",
        "Ask another client whether the task is normally included."
      ],
      "answer": 0,
      "explain": "Household tasks need clear limits. Follow the assigned care plan and agency policy; ask a supervisor when the request is unclear.",
      "source": "First-Half Quiz Study Guide, section 11"
    },
    {
      "id": "b04",
      "mode": "boundaries",
      "topic": "Boundaries",
      "format": "scenario",
      "prompt": "A family offers you an expensive personal gift as thanks. What should guide your response?",
      "choices": [
        "Employer policy and professional boundaries; ask a supervisor if the policy is unclear.",
        "Accept it privately because refusing may offend the family.",
        "Accept it as long as you do not provide extra care in return.",
        "Decline without checking policy or discussing the situation with anyone."
      ],
      "answer": 0,
      "explain": "The available notes emphasize professional boundaries with clients and families. They do not give one universal gift rule, so check employer policy and supervision before responding.",
      "source": "Part Two notes, section 5 (policy-specific detail)"
    },
    {
      "id": "b05",
      "mode": "boundaries",
      "topic": "Boundaries",
      "format": "scenario",
      "prompt": "A client asks you to perform a care task you have not been trained to do. What should you do before acting?",
      "choices": [
        "Pause and check the care plan, your competence, agency policy and supervisor direction.",
        "Try the task carefully because the client trusts you.",
        "Ask the client or family to demonstrate the technique.",
        "Proceed if another worker says it is usually straightforward."
      ],
      "answer": 0,
      "explain": "Trust does not replace training or authorization. The notes direct HCAs to follow competence, care plans, policy and supervision, and to ask when unsure.",
      "source": "First-Half Quiz Study Guide, section 11; Part Two notes, section 5"
    },
    {
      "id": "b06",
      "mode": "boundaries",
      "topic": "Boundaries",
      "format": "scenario",
      "prompt": "A client repeats requests that are frustrating you. Which response protects the client’s dignity and your professional boundaries?",
      "choices": [
        "Respond respectfully, keep the agreed care limits and seek team support if a care or safety concern is emerging.",
        "Ignore further requests so the client learns not to repeat them.",
        "Promise special treatment next visit to end the conversation.",
        "Discuss the client’s behaviour where other residents can hear."
      ],
      "answer": 0,
      "explain": "The notes say frustration does not justify gossip, abuse or unsafe shortcuts. Use appropriate professional channels for legitimate care concerns.",
      "source": "Part Two notes, Assignment 1 scenarios 2 and 3"
    },
    {
      "id": "w01",
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "choice",
      "prompt": "A site-based workplace has nurses and other health professionals nearby, so staff can coordinate care promptly. Is that a benefit or a challenge of site work?",
      "choices": [
        "A benefit of site work",
        "A challenge of site work",
        "A care type",
        "An IADL"
      ],
      "answer": 0,
      "explain": "Working in a structured team environment is listed as a benefit of working in a site. The course notes connect it with coordinated care and support from colleagues.",
      "source": "Workplace Setting slide 21; Part Two notes, section 1"
    },
    {
      "id": "w02",
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "choice",
      "prompt": "A care site has to help shared spaces feel familiar and home-like while meeting facility routines. Which workplace challenge does this describe?",
      "choices": [
        "Making the site feel like home",
        "Coordinating with nearby health professionals",
        "Providing community-based home care",
        "Offering respite to a family caregiver"
      ],
      "answer": 0,
      "explain": "“Making the site feel like home” is explicitly listed as a challenge associated with working in a site.",
      "source": "Workplace Setting slide 21"
    },
    {
      "id": "w03",
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "choice",
      "prompt": "A worker is employed in a facility. Which classification does the Chapter 3 facility-workplace list give to “dealing with people in distress”?",
      "choices": [
        "A challenge of facility work",
        "A benefit of facility work",
        "A community-based setting",
        "A form of palliative care"
      ],
      "answer": 0,
      "explain": "The facility-workplace box lists responding calmly and professionally to clients and families in distress as a challenge. The home-care and direct-employment sections discuss similar emotional demands, so identify the setting named in the question.",
      "source": "Chapter 3, “Benefits and Challenges Associated With Working in a Facility” (p. 43)"
    },
    {
      "id": "w04",
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "choice",
      "prompt": "During a busy shift, staff must meet several clients’ needs and complete many care activities in limited time. Is this a benefit or a challenge of site work?",
      "choices": [
        "A challenge of site work",
        "A benefit of site work",
        "A community-care setting",
        "A type of rehabilitation"
      ],
      "answer": 0,
      "explain": "Meeting multiple needs and demands, and doing many care activities within a short period, are both listed as challenges of working in a site.",
      "source": "Workplace Setting slide 21"
    },
    {
      "id": "m01",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "A student says Medicare is funded mainly by premiums paid directly by each patient. Which description is more accurate?",
      "choices": [
        "Public funds come through federal and provincial or territorial taxes.",
        "Most funding comes from private insurance premiums.",
        "Municipal property taxes pay for the full national plan.",
        "Patients are billed the full cost of insured visits."
      ],
      "answer": 0,
      "explain": "The chapter describes Medicare as publicly funded through federal and provincial or territorial taxes. The governments share responsibilities in the system.",
      "source": "Chapter 2 textbook, “Canada’s Current Health Care System”; Teresa quiz review"
    },
    {
      "id": "m02",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "A medically necessary service is covered under Canada’s core public plan. Which pair of services is at the centre of Medicare coverage?",
      "choices": [
        "Hospital and physician services",
        "Prescription drugs and private home care",
        "Dental and vision services",
        "Every service offered by a health practitioner"
      ],
      "answer": 0,
      "explain": "The textbook centers Medicare on insured medically necessary hospital and physician services. Supplementary benefits and private plans may cover other services, with eligibility and coverage varying.",
      "source": "Chapter 2 textbook, “Canada’s Current Health Care System” and “Additional Services”"
    },
    {
      "id": "m03",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "A province runs its own health-insurance plan. Which federal action supports the national health-care framework?",
      "choices": [
        "Administering the Canada Health Act and transferring funding to provinces and territories",
        "Operating each provincial insurance plan day to day",
        "Deciding which hospitals each province must build",
        "Setting individual clients’ home-care eligibility"
      ],
      "answer": 0,
      "explain": "The federal role includes administering the Canada Health Act, providing funding, and carrying out national policies and programs. Provinces and territories administer their own insurance plans.",
      "source": "Chapter 2 textbook, “The Federal Role in Health Care”; Teresa quiz review"
    },
    {
      "id": "m04",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "A new resident asks which government administers British Columbia’s Medical Services Plan. Who is responsible?",
      "choices": [
        "The provincial government",
        "The federal government",
        "A private insurer selected by the client",
        "The municipal government"
      ],
      "answer": 0,
      "explain": "Each province and territory develops and administers its own insurance plan and plans and finances its services under the Canada Health Act. BC’s plan is MSP.",
      "source": "Chapter 2 textbook, “The Provincial or Territorial Role in Health Care”; First-Half Quiz Study Guide"
    },
    {
      "id": "m05",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada Health Act",
      "format": "choice",
      "prompt": "Which Canada Health Act principle requires coverage of insured medically necessary hospital and physician services?",
      "choices": [
        "Comprehensiveness",
        "Universality",
        "Portability",
        "Public administration"
      ],
      "answer": 0,
      "explain": "Comprehensiveness concerns coverage of insured medically necessary services. For a quiz, distinguish it from universality (who is entitled) and accessibility (reasonable access).",
      "source": "Chapter 2 textbook, Box 2.1; Teresa quiz review"
    },
    {
      "id": "m06",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada Health Act",
      "format": "choice",
      "prompt": "All eligible residents of a province are entitled to the plan’s insured services on similar terms. Which principle is this?",
      "choices": [
        "Universality",
        "Comprehensiveness",
        "Portability",
        "Accessibility"
      ],
      "answer": 0,
      "explain": "Universality describes eligible residents’ entitlement to insured services on similar terms. It does not mean every health service is insured.",
      "source": "Chapter 2 textbook, Box 2.1"
    },
    {
      "id": "m07",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada Health Act",
      "format": "choice",
      "prompt": "A client moves from Manitoba to Nova Scotia and asks whether provincial coverage simply disappears during the move. Which principle is most relevant?",
      "choices": [
        "Portability",
        "Public administration",
        "Comprehensiveness",
        "Universality"
      ],
      "answer": 0,
      "explain": "Portability concerns continuing coverage when travelling or moving, subject to applicable rules. The chapter says people must notify their old jurisdiction and register with the new one; transitional coverage has limits.",
      "source": "Chapter 2 textbook, Box 2.1 and “Supporting Mr. Wloch”; Teresa quiz review"
    },
    {
      "id": "m08",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada Health Act",
      "format": "choice",
      "prompt": "A person’s income, age or health status should not create an improper financial barrier to an insured service. Which principle is the best match?",
      "choices": [
        "Accessibility",
        "Universality",
        "Public administration",
        "Comprehensiveness"
      ],
      "answer": 0,
      "explain": "Accessibility concerns reasonable access to insured services without prohibited financial barriers. It does not promise that every service or every wait time is the same.",
      "source": "Chapter 2 textbook, Box 2.1; Teresa quiz review"
    },
    {
      "id": "m09",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada Health Act",
      "format": "choice",
      "prompt": "A provincial insurance plan is operated by a public authority on a nonprofit basis. Which principle does this illustrate?",
      "choices": [
        "Public administration",
        "Portability",
        "Comprehensiveness",
        "Accessibility"
      ],
      "answer": 0,
      "explain": "Public administration means the insurance plan is run by a public organization on a nonprofit basis and is accountable to the public and government.",
      "source": "Chapter 2 textbook, Box 2.1"
    },
    {
      "id": "m10",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "Which leader is associated with Saskatchewan’s first public hospital-insurance plan in 1947?",
      "choices": [
        "Tommy Douglas",
        "Lester B. Pearson",
        "Pierre Trudeau",
        "John Diefenbaker"
      ],
      "answer": 0,
      "explain": "The textbook associates Saskatchewan’s 1947 hospital-insurance plan with Premier Tommy Douglas. Teresa also specifically told students to remember him.",
      "source": "Chapter 2 textbook, “Evolution of Canada’s Health Care System”; Teresa quiz review"
    },
    {
      "id": "m11",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "In what year was the Canada Health Act passed?",
      "choices": [
        "1984",
        "1947",
        "1966",
        "1972"
      ],
      "answer": 0,
      "explain": "The Canada Health Act is dated 1984 in the course materials. Keep it distinct from Saskatchewan’s 1947 hospital plan and the 1972 expansion of insured medical services described in the chapter.",
      "source": "Chapter 2 textbook, Key Terms; First-Half Quiz Study Guide"
    },
    {
      "id": "m12",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "By 1972, what major expansion of insured medical services had taken place across the provinces and territories?",
      "choices": [
        "Plans had extended coverage to medical services outside hospitals.",
        "Saskatchewan had introduced its first public hospital-insurance plan.",
        "The Canada Health Act had been passed.",
        "Private insurance had replaced provincial plans."
      ],
      "answer": 0,
      "explain": "The textbook describes 1972 as the point by which all provinces and territories had extended their plans to cover medical services outside hospitals, marking modern Medicare.",
      "source": "Chapter 2 textbook, “Evolution of Canada’s Health Care System”"
    },
    {
      "id": "m13",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "What is the purpose of federal tax transfers to provincial and territorial health systems?",
      "choices": [
        "To share the cost of eligible health services within the national framework",
        "To pay every private home-care invoice directly",
        "To let the federal government administer every local clinic",
        "To replace provincial and territorial insurance plans"
      ],
      "answer": 0,
      "explain": "The federal government transfers funding to help provinces and territories share costs. Provincial and territorial governments still plan and administer their own insurance plans.",
      "source": "Chapter 2 textbook, “The Federal Role in Health Care”"
    },
    {
      "id": "m14",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "Which group receives direct health services through some federal programs?",
      "choices": [
        "Serving members of the Canadian Forces",
        "All residents enrolled in a provincial plan",
        "Every person receiving home care",
        "Anyone with employer-sponsored insurance"
      ],
      "answer": 0,
      "explain": "The federal government directly delivers services to certain groups, including serving Canadian Forces members, RCMP members, eligible veterans, inmates of federal penitentiaries, and some First Nations and Inuit groups.",
      "source": "Chapter 2 textbook, “The Federal Role in Health Care”"
    },
    {
      "id": "m15",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Canada’s Medicare",
      "format": "choice",
      "prompt": "Which partners can share responsibility for Indigenous health services?",
      "choices": [
        "Federal, provincial and territorial governments, together with Indigenous organizations",
        "The federal government alone for every service",
        "Provincial governments alone for every community",
        "Private insurers and municipal governments only"
      ],
      "answer": 0,
      "explain": "The chapter describes Indigenous health responsibilities as shared among federal, provincial and territorial governments and Indigenous organizations. Responsibilities also vary by service and community.",
      "source": "Chapter 2 textbook, “Canada’s Current Health Care System” and Indigenous health section"
    },
    {
      "id": "m16",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Indigenous health",
      "format": "choice",
      "prompt": "Which option best captures the range of barriers that can interact to limit access to health services for some Indigenous communities?",
      "choices": [
        "Geography, language or cultural barriers, socioeconomic conditions and jurisdictional complexity",
        "Geography and distance from providers alone",
        "Language and cultural differences alone",
        "Jurisdictional complexity without historical or socioeconomic factors"
      ],
      "answer": 0,
      "explain": "The chapter discusses geographic, organizational, language, cultural and socioeconomic barriers, alongside the effects of historical policies. Avoid reducing the issue to one cause.",
      "source": "Chapter 2 textbook, Indigenous health section; Chapter 2 slides 5–8"
    },
    {
      "id": "m17",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Indigenous health",
      "format": "choice",
      "prompt": "Which set names the four dimensions in the holistic Indigenous health model?",
      "choices": [
        "Physical, mental, emotional and spiritual",
        "Physical, social, financial and occupational",
        "Family, community, language and land",
        "Primary, secondary, tertiary and quaternary"
      ],
      "answer": 0,
      "explain": "The chapter describes Indigenous health and wellness through balance and relationships among physical, mental, emotional and spiritual aspects.",
      "source": "Chapter 2 textbook, Indigenous health section; Teresa quiz review"
    },
    {
      "id": "m18",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Indigenous health",
      "format": "choice",
      "prompt": "A client asks to include a traditional healing practice in their care. Which response best supports culturally safe, client-led care?",
      "choices": [
        "Listen to the client and collaborate with requested healers, while coordinating with the care team.",
        "Assume the client wants the same practices as other Indigenous clients.",
        "Include the practice only if it replaces prescribed treatment.",
        "Ask the family to decide without consulting the client."
      ],
      "answer": 0,
      "explain": "The chapter calls for recognizing the value of Indigenous healing practices and collaborating with healers and Elders when the patient requests it. Cultural respect does not mean making assumptions about an individual.",
      "source": "Chapter 2 textbook, TRC Health Calls to Action; Teresa quiz review"
    },
    {
      "id": "m19",
      "chapter": 2,
      "mode": "medicare",
      "topic": "Indigenous health",
      "format": "choice",
      "prompt": "Which action aligns with the Truth and Reconciliation Commission’s health-related calls to action?",
      "choices": [
        "Support culturally safe care and recognize Indigenous healing practices when requested.",
        "Require all Indigenous clients to choose the same treatment.",
        "Replace community care with hospital care in every case.",
        "Limit Indigenous participation in health professions."
      ],
      "answer": 0,
      "explain": "The calls include addressing health inequities, recognizing Indigenous healing practices when requested, increasing Indigenous health professionals, and cultural competency education.",
      "source": "Chapter 2 textbook, Box 2.4"
    },
    {
      "id": "h01",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Care delivery",
      "format": "choice",
      "prompt": "A person first contacts a family doctor or nurse practitioner for prevention, early diagnosis or a new concern. Which level of care is this?",
      "choices": [
        "Primary care",
        "Secondary care",
        "Tertiary care",
        "Quaternary care"
      ],
      "answer": 0,
      "explain": "Primary health care is generally the first point of contact and includes prevention, health promotion and early diagnosis. It can occur in the community and sometimes in a hospital.",
      "source": "Chapter 2 textbook, “Primary, Secondary, and Tertiary Health Care Delivery”; Teresa quiz review"
    },
    {
      "id": "h02",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Care delivery",
      "format": "choice",
      "prompt": "A family physician refers a client to a cardiologist for assessment and treatment of a specific heart problem. Which level is this?",
      "choices": [
        "Secondary care",
        "Primary care",
        "Tertiary care",
        "Quaternary care"
      ],
      "answer": 0,
      "explain": "Secondary care includes assessment, diagnosis and treatment for more complex issues, often through referral to a specialist. It can happen in a specialist’s community office or a hospital.",
      "source": "Chapter 2 textbook, “Primary, Secondary, and Tertiary Health Care Delivery”; Teresa quiz review"
    },
    {
      "id": "h03",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Care delivery",
      "format": "choice",
      "prompt": "A client needs highly specialized treatment in a teaching hospital’s critical-care unit. Which level best fits?",
      "choices": [
        "Tertiary care",
        "Primary care",
        "Secondary care",
        "Quaternary care"
      ],
      "answer": 0,
      "explain": "Tertiary care is highly specialized and technical, usually in large research or teaching hospitals. Teresa highlighted that it is the most expensive level in the three-level comparison.",
      "source": "Chapter 2 textbook, “Primary, Secondary, and Tertiary Health Care Delivery”; Teresa quiz review"
    },
    {
      "id": "h04",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Care delivery",
      "format": "choice",
      "prompt": "A few specialized centres offer an experimental treatment that goes beyond the usual tertiary-care services. Which level describes it?",
      "choices": [
        "Quaternary care",
        "Primary care",
        "Secondary care",
        "Home care"
      ],
      "answer": 0,
      "explain": "Quaternary care is described as an even more specialized extension of tertiary care and may include experimental medicines or procedures.",
      "source": "Chapter 2 textbook, “Primary, Secondary, and Tertiary Health Care Delivery”"
    },
    {
      "id": "h05",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Care delivery",
      "format": "choice",
      "prompt": "A nurse provides health advice by phone or video and directs callers to appropriate services. What is this way of delivering care called?",
      "choices": [
        "Telehealth",
        "Secondary care",
        "Tertiary care",
        "Home care"
      ],
      "answer": 0,
      "explain": "Telehealth provides phone- or computer-based access to health advice and primary-care support. Teresa used BC’s 811 service as a class example.",
      "source": "Chapter 2 textbook, “Primary, Secondary, and Tertiary Health Care Delivery”; Teresa quiz review (811 example)"
    },
    {
      "id": "h06",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Care delivery",
      "format": "choice",
      "prompt": "A hospital provides emergency treatment, specialist consultations and highly specialized procedures. Which statement best explains how to classify these services?",
      "choices": [
        "Classify each service by its level and complexity; the building alone does not determine the level.",
        "Classify every hospital service as tertiary because it happens in a hospital.",
        "Classify care only by the professional who first referred the client.",
        "Classify home care as secondary because it happens outside a clinic."
      ],
      "answer": 0,
      "explain": "Hospitals can provide more than one level of care. Primary, secondary and tertiary describe the kind and complexity of services, not simply the building.",
      "source": "Chapter 2 textbook, Figure 2.3; Teresa quiz review"
    },
    {
      "id": "h07",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health promotion & prevention",
      "format": "choice",
      "prompt": "A school offers hepatitis B immunization to prevent infection. What type of intervention is this?",
      "choices": [
        "Disease prevention",
        "Health promotion only",
        "Tertiary treatment",
        "Supplementary insurance"
      ],
      "answer": 0,
      "explain": "Immunization is a disease-prevention measure. Teresa specifically used hepatitis B vaccination in elementary school as a class example.",
      "source": "Chapter 2 textbook, “Health Promotion and Disease Prevention”; Teresa quiz review"
    },
    {
      "id": "h08",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health promotion & prevention",
      "format": "choice",
      "prompt": "Which distinction between health promotion and disease prevention is most accurate?",
      "choices": [
        "Promotion supports or improves health and well-being; prevention aims to reduce the chance of illness or injury.",
        "Promotion begins only after a diagnosis; prevention applies only in hospitals.",
        "Promotion and prevention are interchangeable terms for treatment.",
        "Prevention focuses on well-being, while promotion only prevents infection."
      ],
      "answer": 0,
      "explain": "The chapter distinguishes strategies that improve or maintain health and independence from strategies that prevent disease or injury. They are related but not identical.",
      "source": "Chapter 2 textbook, “Health Promotion and Disease Prevention”; Teresa quiz review"
    },
    {
      "id": "h09",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health promotion & prevention",
      "format": "choice",
      "prompt": "A support worker follows directions to keep a bedbound client’s skin clean and dry, reposition them and assist with range-of-motion exercises. What is the main preventive purpose?",
      "choices": [
        "Reduce avoidable complications, such as pressure injuries, while supporting well-being",
        "Provide tertiary treatment without a clinician",
        "Replace nursing assessment and care planning",
        "Restore mobility by changing the client’s prescribed plan"
      ],
      "answer": 0,
      "explain": "The textbook describes support workers contributing to prevention through nonmedical care such as skin care, repositioning and range-of-motion support, within assigned directions and competence.",
      "source": "Chapter 2 textbook, “Health Promotion and Disease Prevention”"
    },
    {
      "id": "h10",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health promotion & prevention",
      "format": "choice",
      "prompt": "Which action is the clearest example of health promotion rather than prevention or treatment?",
      "choices": [
        "Giving people information and resources that support healthy choices and well-being",
        "Offering hepatitis B vaccination to reduce infection risk",
        "Screening for a disease to detect it early",
        "Performing surgery to treat an established injury"
      ],
      "answer": 0,
      "explain": "Health promotion provides information and tools that help people make choices supporting health and wellness. Prevention and promotion are important system functions, not only post-illness treatment.",
      "source": "Chapter 2 textbook, Key Terms and “Health Promotion and Disease Prevention”"
    },
    {
      "id": "h11",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "A client receives health and support services in their own residence. What is this service arrangement called?",
      "choices": [
        "Home care",
        "Tertiary care",
        "Inpatient care",
        "Private insurance"
      ],
      "answer": 0,
      "explain": "Home care means health and support services provided to people in their places of residence. It is a major community-based service.",
      "source": "Chapter 2 textbook, “Home Care”; Chapter 2 slides 19–21"
    },
    {
      "id": "h12",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "Which outcome is a central goal of home-care services when the client’s needs can be met safely at home?",
      "choices": [
        "Maintain health and independence and, where appropriate, delay or avoid facility admission",
        "Ensure that no client ever needs hospital or facility care",
        "Limit support to nursing procedures only",
        "Replace all family and community involvement"
      ],
      "answer": 0,
      "explain": "Home care can maintain health and independence, replace some facility care, or delay or prevent admission when appropriate. Services depend on need and local program rules.",
      "source": "Chapter 2 textbook, “Home Care”"
    },
    {
      "id": "h13",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "Which group reflects the range of people who may receive home-care services, depending on local needs and program rules?",
      "choices": [
        "An older adult, a person recovering from illness, a person with a disability, or a family needing support",
        "Only adults over 65 who live alone",
        "Only people discharged after surgery",
        "Only clients who pay privately"
      ],
      "answer": 0,
      "explain": "The textbook describes home care for a wide range of people, including older adults, families, people with disabilities or medical conditions, and people recovering or receiving end-of-life support.",
      "source": "Chapter 2 textbook, “Home Care”"
    },
    {
      "id": "h14",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "A support worker helps a client bathe and dress at home. Which home-care service category does this illustrate?",
      "choices": [
        "Personal care",
        "Professional therapy",
        "Health-insurance administration",
        "Tertiary treatment"
      ],
      "answer": 0,
      "explain": "Personal-care services are nonmedical supports that may include help with ADLs and comfort care, including care for people who are dying.",
      "source": "Chapter 2 textbook, “Home Care Services and Funding”"
    },
    {
      "id": "h15",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "A worker is assigned household management and daily support, with medication-related assistance only when authorized. Which home-care category best fits?",
      "choices": [
        "Home support services",
        "Professional services",
        "Secondary care",
        "Supplementary benefits"
      ],
      "answer": 0,
      "explain": "The chapter’s home-support category includes household management and daily support. Follow the care plan, employer policy, training and authorized role for any assigned task.",
      "source": "Chapter 2 textbook, “Home Care Services and Funding”; Teresa quiz review"
    },
    {
      "id": "h16",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "Which task is an instrumental activity of daily living (IADL), rather than a basic personal-care ADL?",
      "choices": [
        "Shopping for groceries or managing banking",
        "Bathing",
        "Dressing",
        "Transferring from bed to chair"
      ],
      "answer": 0,
      "explain": "Shopping and banking are examples of support for instrumental activities of daily living. A support worker provides these only when assigned and within role expectations.",
      "source": "Chapter 2 textbook, “Home Care Services and Funding”; Teresa quiz review"
    },
    {
      "id": "h17",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "Which task is usually provided as a professional home-care service rather than a support-worker personal-care task?",
      "choices": [
        "Physiotherapy",
        "Dressing assistance",
        "Help with shopping",
        "Household cleaning"
      ],
      "answer": 0,
      "explain": "Professional services are delivered by the relevant health-care providers and include therapies such as physiotherapy, occupational therapy, speech therapy, nursing and social work.",
      "source": "Chapter 2 textbook, “Home Care Services and Funding”"
    },
    {
      "id": "h18",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "A client moves to another province and expects the same home-care package. Which statement is most accurate?",
      "choices": [
        "Eligibility, funded hours and services may change because provinces and territories set their own home-care programs.",
        "The Canada Health Act guarantees an identical home-care package nationwide.",
        "Only private agencies can provide home care after a move.",
        "Federal tax transfers set each client’s personal care hours directly."
      ],
      "answer": 0,
      "explain": "The textbook says the Canada Health Act does not specify a single home-care package. Provinces and territories define their own systems, so funding, eligibility and services vary.",
      "source": "Chapter 2 textbook, “Home Care Services and Funding”; Teresa quiz review"
    },
    {
      "id": "h19",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "A client receives publicly funded home support from a local provider. Which statement about providers is accurate?",
      "choices": [
        "Public and private organizations, including for-profit and not-for-profit agencies, may provide services.",
        "Only federal employees can deliver home-care support.",
        "Only hospitals may provide services in a client’s home.",
        "Private agencies are prohibited from providing publicly funded support."
      ],
      "answer": 0,
      "explain": "The textbook describes public and private agencies, including for-profit and not-for-profit organizations, as home-care service providers. A public program’s eligibility and funded hours still vary by jurisdiction.",
      "source": "Chapter 2 textbook, “Home Care Services and Funding”"
    },
    {
      "id": "h20",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "A home-care plan assigns personal care and IADL assistance to a support worker. Which action is within that role?",
      "choices": [
        "Provide the assigned support within training, policy and supervision.",
        "Diagnose a new condition and prescribe treatment.",
        "Deliver every nursing and therapy service independently.",
        "Ignore the care plan when a client asks for something different."
      ],
      "answer": 0,
      "explain": "The textbook says support workers provide most home-care support services, including personal care, home support and IADL assistance. Follow the assigned plan, training, policy and supervision.",
      "source": "Chapter 2 textbook, “Home Care Services and Funding”; Teresa quiz review"
    },
    {
      "id": "h21",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Home care",
      "format": "choice",
      "prompt": "A screened volunteer delivers meals and makes friendly visits as part of a home-care program. How is this support best classified?",
      "choices": [
        "Volunteer service",
        "Professional therapy",
        "Tertiary care",
        "A Canada Health Act principle"
      ],
      "answer": 0,
      "explain": "The chapter distinguishes volunteer services, such as Meals on Wheels or friendly visiting, from professional services and assigned support-worker duties.",
      "source": "Chapter 2 textbook, “Home Care Services and Funding”"
    },
    {
      "id": "h22",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health system & coverage",
      "format": "choice",
      "prompt": "Which group consists of supplementary benefits that may be available to some people under particular programs?",
      "choices": [
        "Prescription drugs, dental or vision care, and equipment such as wheelchairs or prostheses",
        "Medically necessary hospital and physician services only",
        "Every private home-care visit for every resident",
        "Only physician services delivered in an emergency department"
      ],
      "answer": 0,
      "explain": "Supplementary benefits may include prescription drugs, dental and vision care, medical equipment and appliances, and some additional services. Eligibility and coverage amounts vary; do not assume full coverage.",
      "source": "Chapter 2 textbook, “Additional (Supplementary) Services”; Teresa quiz review"
    },
    {
      "id": "h23",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health system & coverage",
      "format": "choice",
      "prompt": "A client sees wheelchairs listed among supplementary benefits and assumes every person receives full payment. Which correction is best?",
      "choices": [
        "Eligibility and the amount covered depend on the specific public program or insurance plan.",
        "Every wheelchair is fully paid under the Canada Health Act.",
        "Equipment is covered only by private insurance.",
        "Supplementary benefits cover the same items and amounts for everyone."
      ],
      "answer": 0,
      "explain": "Teresa warned against assuming “complete coverage.” The textbook says supplementary benefit coverage varies and private-plan coverage also depends on the plan purchased.",
      "source": "Chapter 2 textbook, “Additional (Supplementary) Services” and “Private Health Insurance”; Teresa quiz review"
    },
    {
      "id": "h24",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health system & coverage",
      "format": "choice",
      "prompt": "An employer offers private insurance. What determines whether a worker’s plan covers prescription drugs, ambulance services or home care?",
      "choices": [
        "The specific plan’s terms, eligibility rules and coverage limits",
        "A standard package identical across all employers",
        "The Canada Health Act’s core hospital-and-physician coverage",
        "The local hospital’s decision about the client’s care level"
      ],
      "answer": 0,
      "explain": "Private plans differ by company and by the coverage purchased; the service and amount covered can vary. Supplementary benefits are not a single guaranteed package.",
      "source": "Chapter 2 textbook, “Private Health Insurance”; Teresa quiz review"
    },
    {
      "id": "h25",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health system & coverage",
      "format": "choice",
      "prompt": "Drug, technology, building and labour expenses are all rising. Which system challenge do these pressures illustrate?",
      "choices": [
        "The steadily rising cost of care",
        "The growth of appropriate outpatient day surgery",
        "The existence of community clinics",
        "The use of telehealth"
      ],
      "answer": 0,
      "explain": "The textbook identifies rising costs as the greatest challenge, noting the expense of drugs, technology, buildings and labour. Teresa also highlighted cost pressures during class review.",
      "source": "Chapter 2 textbook, “Health Care Challenges, Supplementary Services, and Trends”; Teresa quiz review"
    },
    {
      "id": "h26",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health system & coverage",
      "format": "choice",
      "prompt": "Which combination best reflects current pressures on Canada’s health-care system?",
      "choices": [
        "Worker shortages, aging populations and workforce, rising costs, and waits for care",
        "More rural health workers, lower costs and shorter waits",
        "Fewer people needing care and identical eligibility rules everywhere",
        "An increase in home care that eliminates hospital demand"
      ],
      "answer": 0,
      "explain": "The chapter discusses health-worker shortages, population and workforce aging, waiting lists, LTC admission waits and rising costs as pressures on the system.",
      "source": "Chapter 2 textbook, “Health Care Challenges, Supplementary Services, and Trends”; Chapter 2 slides 17"
    },
    {
      "id": "h27",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health system & coverage",
      "format": "choice",
      "prompt": "Why have outpatient day surgery and home- or community-based services become more common?",
      "choices": [
        "They can provide suitable care outside hospital and reduce avoidable spending or pressure.",
        "They remove the need for assessment and follow-up.",
        "They make every service publicly funded for every resident.",
        "They move all tertiary procedures into clients’ homes."
      ],
      "answer": 0,
      "explain": "The chapter describes alternatives such as clinics, health centres, day surgery and home care as ways to provide quality care while avoiding needless spending. Suitability depends on the client and service.",
      "source": "Chapter 2 textbook, “Health Care Trends”; Teresa quiz review"
    },
    {
      "id": "h28",
      "chapter": 2,
      "mode": "pathways",
      "topic": "Health system & coverage",
      "format": "choice",
      "prompt": "Which option is an alternative health practice rather than a care level or insurance program?",
      "choices": [
        "Acupuncture",
        "Tertiary care",
        "A provincial health-insurance plan",
        "A specialist referral"
      ],
      "answer": 0,
      "explain": "The chapter lists practices such as massage therapies, homeopathy, herbal medicines and acupuncture. It treats these separately from the three levels of health-care delivery.",
      "source": "Chapter 2 textbook, “Alternative Health Practices”"
    },
    {
      "id": "c11",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "scenario",
      "prompt": "An older adult with early-stage Alzheimer’s is unsafe alone during the day while their daughter works. Which service can offer supervised daytime activities and caregiver support while the client continues living at home?",
      "choices": [
        "An adult day program",
        "Long-term care placement without a needs assessment",
        "An inpatient hospital admission for each workday",
        "A private insurance plan"
      ],
      "answer": 0,
      "explain": "Teresa highlighted adult day programs as daytime supervision, activity and caregiver support that can help someone remain in the community when appropriate. Early dementia alone does not automatically mean long-term care.",
      "source": "Teresa Chapter 3 quiz review; Workplace Setting slides 14–15"
    },
    {
      "id": "c12",
      "chapter": 3,
      "mode": "acuity",
      "topic": "Care types",
      "format": "scenario",
      "prompt": "A person is experiencing harms related to illicit drug use and needs help with addiction. Which service is most directly focused on these needs while the team assesses appropriate ongoing supports?",
      "choices": [
        "Specialized mental-health and addiction services",
        "Long-term care, based on the diagnosis alone",
        "Retirement-home housekeeping",
        "Routine acute care as the only continuing service"
      ],
      "answer": 0,
      "explain": "Teresa emphasized matching the service to the need and stabilizing the client through specialized mental-health or addiction services before choosing a longer-term living arrangement.",
      "source": "Teresa Chapter 3 quiz review"
    },
    {
      "id": "c13",
      "chapter": 3,
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "choice",
      "prompt": "A resident in long-term care pays a monthly fee. Which statement best describes how public Medicare coverage may contribute to the cost?",
      "choices": [
        "Medicare covers some costs, while the resident may pay a monthly fee toward the balance.",
        "Medicare covers every cost, so a monthly fee is never charged.",
        "The resident pays the entire cost because no public funding applies.",
        "Only private insurance can contribute to long-term-care costs."
      ],
      "answer": 0,
      "explain": "Public funding covers some long-term-care costs, while residents may pay a monthly fee toward the balance. Coverage and fees depend on the relevant program and setting.",
      "source": "Workplace Setting slide 19; Teresa Chapter 3 quiz review"
    },
    {
      "id": "c14",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "choice",
      "prompt": "An independently mobile older adult lives in a residence with their own bedroom and bathroom, shared dining and living areas, and housekeeping help. They need little personal care; if their daily care needs grow beyond minimal support, a move may be needed. Which residence is described?",
      "choices": [
        "Retirement residence",
        "Long-term care facility",
        "Community day program",
        "Acute-care hospital"
      ],
      "answer": 0,
      "explain": "A retirement residence supports older adults who are largely independent, with accommodation, security, hospitality services, and limited personal care. The text also notes that a retirement home is one type of assisted-living facility, so those labels can overlap; higher daily nursing and personal-care needs point toward long-term care.",
      "source": "Chapter 3, “Retirement Residences” (pp. 38–39)"
    },
    {
      "id": "c15",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "choice",
      "prompt": "A hospital patient is assigned a bed and stays overnight for observation. Which term describes the patient’s status?",
      "choices": [
        "Inpatient",
        "Outpatient",
        "Resident",
        "Day-program participant"
      ],
      "answer": 0,
      "explain": "An inpatient is assigned a bed and admitted to stay overnight or longer. An outpatient receives care without staying overnight. The distinction is about the patient’s admission and stay, not whether the procedure is complex.",
      "source": "Chapter 3, “Working in Facility-Based Settings” (p. 42)"
    },
    {
      "id": "c16",
      "chapter": 3,
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A terminally ill client is no longer seeking life-prolonging treatment. The support worker provides ADL assistance and encouragement while respecting the client’s emotional, social, and spiritual needs. Which care type is the clearest match?",
      "choices": [
        "Hospice care",
        "Subacute care",
        "Respite care",
        "Long-term care"
      ],
      "answer": 0,
      "explain": "Hospice is for a client with a terminal diagnosis who is no longer seeking life-prolonging care. Support workers may assist with personal care and ADLs and offer emotional support to the client and family.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 37)"
    },
    {
      "id": "c17",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "scenario",
      "prompt": "An older resident lives in their own apartment with a kitchen and needs support with some ADLs. The residence offers emergency response, social programs, meals, housekeeping, and laundry; services can vary by resident. Which setting best fits?",
      "choices": [
        "Assisted-living (supportive housing) facility",
        "Long-term care facility",
        "Hospital inpatient unit",
        "Community day program"
      ],
      "answer": 0,
      "explain": "Assisted-living facilities provide apartments and support services, commonly including 24-hour supervision and emergency response, recreation, meals, housekeeping, and laundry. Some residents buy extra help or qualify for home care. A retirement home is one type of assisted-living facility.",
      "source": "Chapter 3, “Assisted-Living Facilities” (p. 39)"
    },
    {
      "id": "c18",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "scenario",
      "prompt": "A resident in an assisted-living apartment now needs extensive personal care and 24-hour professional nursing. Which setting is designed for that higher level of ongoing care when hospital treatment is not needed?",
      "choices": [
        "Long-term care facility",
        "Retirement residence with hospitality services only",
        "Community day program",
        "Acute-care hospital"
      ],
      "answer": 0,
      "explain": "Long-term care facilities provide accommodation, 24-hour professional nursing, and support to people who cannot care for themselves at home but do not need hospital care. They offer a higher level of care than retirement residences and assisted-living facilities.",
      "source": "Chapter 3, “Long-Term Care Facilities” (p. 42)"
    },
    {
      "id": "c19",
      "chapter": 3,
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "During home care, a client’s physiotherapist asks you to add an unfamiliar exercise to the shift. Your agency supervisor has not assigned it, and you are unsure whether policy permits it. What should you do?",
      "choices": [
        "Check with your supervisor before doing the unfamiliar or unapproved task.",
        "Do it because the request came from a regulated health professional.",
        "Try it once and report afterward if the client tolerates it.",
        "Ask the client’s family to authorize it instead of checking agency policy."
      ],
      "answer": 0,
      "explain": "When different providers give direction, check with the supervisor before performing a task that is unfamiliar or not allowed by agency policy. Stay within your training, job description, and scope.",
      "source": "Chapter 3, “Benefits and Challenges Associated With Working in Home Care” (p. 40)"
    },
    {
      "id": "c20",
      "chapter": 3,
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "During a home visit, you notice a frayed electrical cord beside a client who smokes. The care task itself is going smoothly. What is the best next step?",
      "choices": [
        "Discuss the safety concern with the client and your supervisor.",
        "Ignore it because the cord is outside the current care task.",
        "Repair the electrical cord yourself before continuing.",
        "Ask the client to promise not to use the cord and make no report."
      ],
      "answer": 0,
      "explain": "The chapter identifies frayed cords and unsafe smoking practices as possible hazards in clients’ homes. Discuss safety concerns with the client and supervisor; do not take on repair work beyond your role.",
      "source": "Chapter 3, “Benefits and Challenges Associated With Working in Home Care” (p. 40)"
    },
    {
      "id": "c21",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "scenario",
      "prompt": "A day program for adults with health conditions runs in a room inside a nursing home. Participants attend for structured activities and personal assistance, then return to their homes. Which conclusion is best?",
      "choices": [
        "It is a community day program; the building hosting it does not change the program’s daytime purpose.",
        "It is long-term care because every service in a nursing home is residential care.",
        "It is inpatient care because the host building also has inpatient beds.",
        "It is respite care only if every participant has a family caregiver."
      ],
      "answer": 0,
      "explain": "Community day programs may be held in hospitals, nursing homes, community centres, churches, or other sites. They provide daytime services to participants who live in the community and may also provide a break for family caregivers.",
      "source": "Chapter 3, “Community Day Programs” (p. 41)"
    },
    {
      "id": "c22",
      "chapter": 3,
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "scenario",
      "prompt": "At a community day program, several participants need attention at once. One asks for help with personal care while others are waiting for an activity to begin. Which skill set most directly addresses this challenge?",
      "choices": [
        "Prioritize needs using sound judgment and time management while focusing on each person.",
        "Complete tasks in arrival order, regardless of urgency or individual need.",
        "Leave the group to ask family caregivers to decide which participant goes first.",
        "Promise immediate attention to everyone before checking what is possible."
      ],
      "answer": 0,
      "explain": "Day-program staff may need to attend to many people, focus on each person, and decide whose needs to address first. Judgment and time management are essential.",
      "source": "Chapter 3, “Benefits and Challenges Associated With Working in a Community Day Program” (p. 41)"
    },
    {
      "id": "c23",
      "chapter": 3,
      "mode": "safety",
      "topic": "Safety & role",
      "format": "scenario",
      "prompt": "A hospital nurse asks a support worker to perform a procedure the worker has never been taught. The client is stable, and the nurse is busy. What is the appropriate response?",
      "choices": [
        "Do not attempt it; explain the training gap and follow facility policy for obtaining direction.",
        "Perform it because the nurse requested it and the client is stable.",
        "Ask an experienced support worker to demonstrate once, then proceed alone.",
        "Wait until after the procedure, then document that it was unfamiliar."
      ],
      "answer": 0,
      "explain": "Facility policy, training, and supervision govern delegated tasks. Never perform a procedure you have not been taught or cannot do safely, even when asked by a nurse.",
      "source": "Chapter 3, “Hospitals and Other Facility-Based Care” and “Benefits and Challenges Associated With Working in a Facility” (pp. 42–43)"
    },
    {
      "id": "c24",
      "chapter": 3,
      "mode": "safety",
      "topic": "Workplace settings",
      "format": "scenario",
      "prompt": "A long-term-care resident has a gradual change in daily function. Which contribution is within a support worker’s team role?",
      "choices": [
        "Report observations to the nurse and contribute relevant information to the care plan or family conference.",
        "Diagnose the cause and revise the resident’s nursing plan independently.",
        "Wait to mention it until the next formal assessment, even if it affects care today.",
        "Tell the family a diagnosis so they can change the care plan."
      ],
      "answer": 0,
      "explain": "Support workers report to a nurse, provide personal care, and contribute valuable observations to care plans and family conferences. Nurses plan and coordinate resident care.",
      "source": "Chapter 3, “Long-Term Care Facilities” (p. 42)"
    },
    {
      "id": "c25",
      "chapter": 3,
      "mode": "care",
      "topic": "Care types",
      "format": "scenario",
      "prompt": "A client is medically stable after an injury but cannot yet return home because they still need inpatient care with complex equipment and frequent treatment. Which distinction is most accurate?",
      "choices": [
        "This can be subacute/complex continuing care even though the client is stable.",
        "It must be long-term care because the client is not going home today.",
        "It is outpatient care because the client is recovering rather than acutely ill.",
        "It is restorative care only, which excludes inpatient treatment."
      ],
      "answer": 0,
      "explain": "Subacute or complex continuing care serves people who are recovering from surgery, injury, acute illness, or an exacerbation. A stable client may still need complex procedures and inpatient recovery before discharge.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 36)"
    },
    {
      "id": "c26",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "choice",
      "prompt": "A small shared house in a neighbourhood provides residents with disabilities 24-hour supervision, meals, housekeeping, laundry, and help with personal care and ADLs. Which setting is described?",
      "choices": [
        "Group home",
        "Retirement residence",
        "Hospital outpatient clinic",
        "Community day program"
      ],
      "answer": 0,
      "explain": "A group home is a live-in facility where a small number of people with physical or mental disabilities live together and receive supervision, care, and support. Residents generally share living and dining spaces.",
      "source": "Chapter 3, “Group Homes” (p. 40)"
    },
    {
      "id": "c27",
      "chapter": 3,
      "mode": "care",
      "topic": "Care types",
      "format": "choice",
      "prompt": "A person’s mental-health assessment and treatment plan is designed to help them function as independently as possible after returning to community life. Which statement best fits the service model?",
      "choices": [
        "Mental-health services may be inpatient or outpatient and often aim to support a return to community living.",
        "Mental-health services require long-term hospital admission in every case.",
        "Community support begins only after all treatment has stopped.",
        "A return to the community means the person no longer needs health services."
      ],
      "answer": 0,
      "explain": "Mental-health services include both inpatient and outpatient care. Clients are usually encouraged to return to the community, where community-based care and support can help them function independently.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 37)"
    },
    {
      "id": "c28",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "scenario",
      "prompt": "A First Nation employs a support worker in a rural community. The job description emphasizes home management as well as personal care, unlike a nearby agency’s role. Which conclusion follows from the chapter?",
      "choices": [
        "The role may vary by employer; read the specific job description and stay within that scope.",
        "The role is invalid because support workers everywhere must have identical duties.",
        "The worker may take on any task that improves community access.",
        "Only personal care can be included in Indigenous or First Nations services."
      ],
      "answer": 0,
      "explain": "Indigenous or First Nations services aim to support and empower Indigenous peoples to improve access to and delivery of services. Support-worker job descriptions may vary between employers, so follow the local role and scope.",
      "source": "Chapter 3, “Workplace Settings and Services Provided” (p. 36)"
    },
    {
      "id": "c29",
      "chapter": 3,
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "scenario",
      "prompt": "You are hired directly by a client. The client’s requested tasks and weekly hours have changed several times, and no written expectations were agreed. What should you clarify first?",
      "choices": [
        "The expected duties, how performance will be assessed, and the employment terms such as hours and pay.",
        "Whether the client will let you skip the provincial scope of practice.",
        "Whether family members can approve nursing procedures on the client’s behalf.",
        "Whether you can delay clarifying duties until a problem occurs."
      ],
      "answer": 0,
      "explain": "For direct employment, clarify work limits and performance expectations before starting, preferably in writing. Hours and pay may change from week to week, so understand the terms before agreeing.",
      "source": "Chapter 3, “Working Directly for Clients” and “Benefits and Challenges Associated With Working Directly for Clients” (p. 42)"
    },
    {
      "id": "c30",
      "chapter": 3,
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "scenario",
      "prompt": "A support worker is self-employed and provides care in a client’s home. Which risk-management point is singled out for this arrangement?",
      "choices": [
        "The worker is legally responsible for workplace injuries or mishaps and should carry liability insurance.",
        "The client’s public funding automatically covers the worker’s liability.",
        "The agency’s insurance always covers a self-employed worker.",
        "The worker’s only responsibility is to record hours and pay."
      ],
      "answer": 0,
      "explain": "The chapter says self-employed support workers are legally responsible for injury or workplace mishaps that occur while providing care and identifies liability insurance as important.",
      "source": "Chapter 3, “Benefits and Challenges Associated With Working Directly for Clients” (p. 42)"
    },
    {
      "id": "c31",
      "chapter": 3,
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "choice",
      "prompt": "Which feature is described as a possible benefit of home-care work, even though it can also require independent judgment?",
      "choices": [
        "Working one-on-one and having independence to solve some problems",
        "Having nurses and other professionals physically present at all times",
        "Following the same routine for every client",
        "Avoiding all scheduling around a client’s care needs"
      ],
      "answer": 0,
      "explain": "Some workers value one-on-one variety and the independence of home care. A supervisor may be reachable by phone, so the worker may need judgment to solve problems within their role.",
      "source": "Chapter 3, “Benefits and Challenges Associated With Working in Home Care” (p. 40)"
    },
    {
      "id": "c32",
      "chapter": 3,
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "scenario",
      "prompt": "In a live-in facility, a worker begins personal care without knocking because the task is behind schedule. Which action best protects the resident’s privacy and dignity?",
      "choices": [
        "Knock and announce yourself, screen the area, cover the resident, and respect their preferences.",
        "Finish quickly because timeliness is more important than privacy during personal care.",
        "Ask another resident to close the door while you begin.",
        "Discuss the resident’s care in a common area so the team is informed."
      ],
      "answer": 0,
      "explain": "The chapter emphasizes treating a live-in facility as the resident’s home. Knock and announce your presence, provide privacy during care, keep client discussions confidential and professional, and respect preferences and property.",
      "source": "Chapter 3, “Especially in Live-in Facilities” (p. 43)"
    },
    {
      "id": "c33",
      "chapter": 3,
      "mode": "safety",
      "topic": "Benefits & challenges",
      "format": "choice",
      "prompt": "A facility uses evening and night shifts, sometimes lasting 8 to 12 hours. Which statement best reflects the chapter’s discussion of shift work?",
      "choices": [
        "It is a workplace challenge for some workers, though others value the variety or scheduling flexibility.",
        "It is always a benefit because the facility is open all day.",
        "It is a safety procedure reserved for long-term care residents.",
        "It means a worker may skip required handover and care plans."
      ],
      "answer": 0,
      "explain": "Facilities operate throughout the day. Some workers enjoy different shifts or the schedule they create, while others struggle with changes to sleep and lifestyle.",
      "source": "Chapter 3, “Benefits and Challenges Associated With Working in a Facility” (p. 43)"
    },
    {
      "id": "c34",
      "chapter": 3,
      "mode": "setting",
      "topic": "Workplace settings",
      "format": "choice",
      "prompt": "An older person can manage personal care but wants accommodation, meals, housekeeping, and security. They do not need ongoing nursing. Which residence is the closest match?",
      "choices": [
        "Retirement residence",
        "Long-term care facility",
        "Inpatient hospital unit",
        "Group home providing 24-hour personal-care support"
      ],
      "answer": 0,
      "explain": "Retirement residences support older adults who are independently mobile and need little or no personal-care assistance. People who need more than minimal daily care may need long-term care instead.",
      "source": "Chapter 3, “Retirement Residences” (pp. 38–39)"
    }
  ]
};
