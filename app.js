// app.js - AI 꿈자람 진로탐색 검사 로직 구현

// 1. 40문항 데이터 정의 (MBTI 16문항, Holland 12문항, 가치관 6문항, 생활습관 6문항)
const questions = [
    // [Part 1] 성격 및 대인관계 (MBTI 기반 - 16문항: EI, SN, TF, JP 지표당 대칭형 각 4문항씩)
    { id: 1, type: "mbti", dimension: "EI", subDimension: "E", text: "주말이나 방과 후에 친구들과 밖에서 뛰어놀거나 이야기하는 것이 혼자 집에 있는 것보다 더 좋다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 2, type: "mbti", dimension: "EI", subDimension: "E", text: "새로운 친구를 만나서 이야기하거나 친해지는 것이 부끄럽지 않고 재미있다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 3, type: "mbti", dimension: "EI", subDimension: "I", text: "혼자서 책을 읽거나, 좋아하는 만들기를 하며 조용히 나만의 시간을 보낼 때 마음이 더 편안하다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 4, type: "mbti", dimension: "EI", subDimension: "I", text: "여러 사람 앞에 서서 발표하기보다는 친하고 편한 친구 1~2명과 도란도란 대화하는 것이 더 좋다.", category: "성격 유형", badgeClass: "badge-mbti" },
    
    { id: 5, type: "mbti", dimension: "SN", subDimension: "S", text: "그림을 그리거나 무언가를 만들 때, 눈에 보이는 진짜 사물을 똑같이 따라 그리는 것을 좋아한다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 6, type: "mbti", dimension: "SN", subDimension: "N", text: "엉뚱하고 재미있는 상상을 하거나, \"미래에는 세상이 어떻게 변할까?\" 같은 생각을 자주 한다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 7, type: "mbti", dimension: "SN", subDimension: "S", text: "상상 속 이야기보다 실제로 겪은 일이나 역사적 사실, 과학 실험 같은 실제 일어난 일에 더 호기심이 생긴다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 8, type: "mbti", dimension: "SN", subDimension: "N", text: "책을 읽거나 영화를 볼 때 주인공의 감정에 몰입해 뒷이야기를 상상하여 덧붙여 꾸며보는 것을 잘한다.", category: "성격 유형", badgeClass: "badge-mbti" },
    
    { id: 9, type: "mbti", dimension: "TF", subDimension: "F", text: "친구가 속상해서 울고 있을 때, 해결 방법을 말해주는 것보다 \"속상했겠다\" 하며 마음을 위로해 주는 것이 먼저다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 10, type: "mbti", dimension: "TF", subDimension: "T", text: "놀이나 게임 규칙을 정할 때, 모든 사람에게 공평하고 논리적인 규칙이 가장 중요하다고 생각한다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 11, type: "mbti", dimension: "TF", subDimension: "T", text: "잘못된 일에 대해서는 친한 친구라 할지라도 무엇이 잘못되었는지 이성적이고 차분하게 짚고 넘어가야 한다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 12, type: "mbti", dimension: "TF", subDimension: "F", text: "다른 사람을 대할 때 말의 논리성보다는 상대방이 상처받지 않게 다정한 말투로 전하는 것이 더 소중하다.", category: "성격 유형", badgeClass: "badge-mbti" },
    
    { id: 13, type: "mbti", dimension: "JP", subDimension: "J", text: "학교 준비물이나 숙제는 미리미리 챙겨 두고, 계획표를 세워서 행동하는 편이다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 14, type: "mbti", dimension: "JP", subDimension: "P", text: "계획이 중간에 갑자기 바뀌거나 새로운 일정이 생겨도 당황하지 않고 즐겁게 적응한다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 15, type: "mbti", dimension: "JP", subDimension: "J", text: "가방이나 책장이 흐트러져 있는 것보다 일정한 규칙에 따라 정돈되어 있어야 마음이 편안하고 일이 잘 된다.", category: "성격 유형", badgeClass: "badge-mbti" },
    { id: 16, type: "mbti", dimension: "JP", subDimension: "P", text: "정해진 시간표를 빡빡하게 따르기보다는 자유롭게 그때그때 하고 싶은 과목이나 놀이를 선택해서 하는 것이 좋다.", category: "성격 유형", badgeClass: "badge-mbti" },

    // [Part 2] 내가 좋아하는 활동 (Holland 진로 흥미 - 12문항)
    { id: 17, type: "holland", dimension: "R", text: "손으로 로봇을 조립하거나, 식물을 기르고, 무언가를 고치는 활동을 좋아한다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 18, type: "holland", dimension: "R", text: "교실에 앉아 공부하는 것보다 체육 시간이나 밖에서 몸을 움직이는 활동이 더 즐겁다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 19, type: "holland", dimension: "I", text: "과학 실험을 하거나, 수학 문제를 풀 때 왜 그런 결과가 나왔는지 원리를 알아내는 것이 재미있다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 20, type: "holland", dimension: "I", text: "곤충, 별자리, 역사 등 관심 있는 분야를 책이나 인터넷에서 깊이 있게 찾아보는 편이다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 21, type: "holland", dimension: "A", text: "글쓰기, 그리기, 악기 연주, 연극 등 나만의 생각이나 느낌을 자유롭게 표현하는 활동이 좋다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 22, type: "holland", dimension: "A", text: "교실이나 내 방을 꾸미거나, 옷을 예쁘게 매치해서 입는 등 아름다운 것에 관심이 많다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 23, type: "holland", dimension: "S", text: "모르는 것을 물어보는 친구에게 친절하게 설명해 주거나 도와줄 때 큰 보람을 느낀다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 24, type: "holland", dimension: "S", text: "친구들 사이에서 의견이 안 맞을 때, 중간에서 서로 화해할 수 있도록 돕는 역할을 잘한다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 25, type: "holland", dimension: "E", text: "모둠 활동(그룹 과제)을 할 때, 앞장서서 친구들을 이끌고 역할을 나누어 주는 대장 역할을 좋아한다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 26, type: "holland", dimension: "E", text: "회장 선거에 나가거나 사람들 앞에 서서 내 주장과 생각을 발표하는 것에 자신감이 있다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 27, type: "holland", dimension: "C", text: "필기구를 깔끔하게 정리정돈하거나, 일기장/노트를 규칙에 맞춰 꼼꼼하게 적는 일을 잘한다.", category: "진로 흥미", badgeClass: "badge-holland" },
    { id: 28, type: "holland", dimension: "C", text: "선생님이나 부모님이 정해주신 규칙이나 정해진 순서를 정확하게 지키는 것이 마음 편하다.", category: "진로 흥미", badgeClass: "badge-holland" },

    // [Part 3] 내가 소중하게 생각하는 가치 (가치관 지표 - 6문항)
    { id: 29, type: "value", dimension: "creativity", text: "남들과 똑같은 방법보다 나만의 새로운 아이디어와 방법으로 문제를 해결할 때 기분이 좋다.", category: "가치관", badgeClass: "badge-values" },
    { id: 30, type: "value", dimension: "cooperation", text: "혼자서 1등을 하는 것보다 친구들과 다 같이 협동하여 하나의 목표를 이루는 것이 더 소중하다.", category: "가치관", badgeClass: "badge-values" },
    { id: 31, type: "value", dimension: "autonomy", text: "다른 사람이 시켜서 하는 일보다 내가 스스로 결정하고 계획해서 하는 일에 더 열정이 생긴다.", category: "가치관", badgeClass: "badge-values" },
    { id: 32, type: "value", dimension: "achievement", text: "어려운 문제나 숙제를 끈기 있게 끝까지 풀어내어 스스로 성공했을 때 큰 뿌듯함을 느낀다.", category: "가치관", badgeClass: "badge-values" },
    { id: 33, type: "value", dimension: "altruism", text: "나에게 이익이 되지 않더라도, 우리 반이나 이웃을 위해 착한 일을 하거나 돕는 행동이 가치 있다고 생각한다.", category: "가치관", badgeClass: "badge-values" },
    { id: 34, type: "value", dimension: "influence", text: "내 아이디어나 리더십으로 친구들이나 모둠의 의견을 이끌고 변화를 주도할 때 뿌듯함을 느낀다.", category: "가치관", badgeClass: "badge-values" },

    // [Part 4] 나의 공부 및 생활 습관 (학습 및 생활 습관 - 6문항)
    { id: 35, type: "habit", dimension: "plan", text: "오늘 해야 할 공부나 일을 시작하기 전에 무엇부터 해야 할지 미리 정해 놓는다.", category: "생활 습관", badgeClass: "badge-habits" },
    { id: 36, type: "habit", dimension: "focus", text: "공부를 시작하면 스마트폰이나 게임 생각에 한눈팔지 않고 오랫동안 집중할 수 있다.", category: "생활 습관", badgeClass: "badge-habits" },
    { id: 37, type: "habit", dimension: "management", text: "내 책상, 가방, 방 안을 스스로 깨끗하게 정리하고 정돈하는 습관이 있다.", category: "생활 습관", badgeClass: "badge-habits" },
    { id: 38, type: "habit", dimension: "cooperation", text: "모둠 수업을 할 때 내 의견만 고집하지 않고 다른 친구들의 이야기를 귀담아듣고 잘 맞추어 준다.", category: "생활 습관", badgeClass: "badge-habits" },
    { id: 39, type: "habit", dimension: "feedback", text: "숙제나 공부가 끝나면 내가 잘 이해했는지 다시 살펴보고, 시간 약속(등교 시간, 학원 시간 등)을 잘 지킨다.", category: "생활 습관", badgeClass: "badge-habits" },
    { id: 40, type: "habit", dimension: "self_control", text: "공부나 숙제를 할 때 하기 싫은 마음이 들어도 감정을 조절하며 스스로 정한 분량을 끝까지 해낸다.", category: "생활 습관", badgeClass: "badge-habits" }
];

// 2. MBTI 데이터 해설셋
const mbtiDetails = {
    ISTJ: { name: "신중한 소금인형", sub: "소중한 규칙을 지키는 꼼꼼이", desc: "한번 시작한 일은 끝까지 책임감 있게 해내며, 약속과 규칙을 잘 지킵니다. 신중하고 차분하여 주변 친구들에게 두터운 신뢰를 받습니다.", relation: "친구들과 협동할 때, 상대방이 약속을 조금 늦거나 어기더라도 너그럽게 기다려주고 솔직하게 마음을 털어놓는 대화가 도움이 됩니다." },
    ISFJ: { name: "다정한 보안관", sub: "친구를 소중히 돌보는 마음 천사", desc: "주변 친구들을 따뜻하게 보살펴 주고, 다른 사람의 감정에 깊이 공감합니다. 조용하지만 맡은 일을 묵묵히 해결하는 보석 같은 성격입니다.", relation: "거절하는 것을 어려워하여 스트레스를 받을 수 있으니, 어렵거나 부담되는 부탁은 정중히 '아니야'라고 의사를 밝히는 연습을 해보세요." },
    INFJ: { name: "따뜻한 예언가", sub: "보이지 않는 마음을 살피는 수호자", desc: "생각이 깊고 상상력이 풍부하며, 보이지 않는 곳에서 친구들을 위해 헌신합니다. 올바른 가치관과 깊은 통찰력을 지니고 있습니다.", relation: "생각이 너무 많아져 마음이 복잡해질 때는 신뢰하는 부모님이나 친한 친구에게 털어놓고 함께 나누어 보세요." },
    INTJ: { name: "비밀의 과학자", sub: "세상을 분석하는 미래 발명가", desc: "호기심이 강하고 논리적이며, 복잡한 문제를 해결하는 것을 좋아합니다. 자신만의 독창적인 아이디어와 강한 의지력으로 목표를 완수합니다.", relation: "자기 생각이 강해 의견 충돌이 생길 수 있으니, 친구들의 아이디어도 한 번 더 칭찬해 주고 경청하는 자세를 가져 보세요." },
    ISTP: { name: "만능 해결사", sub: "무엇이든 고치고 만드는 손재주꾼", desc: "관찰력이 뛰어나고 기계를 다루거나 손으로 무언가를 뚝딱 만드는 일에 강합니다. 위급한 상황에서도 침착하게 문제를 대처합니다.", relation: "혼자만의 시간을 좋아해서 무뚝뚝하게 보일 수 있으니, 친구들에게 먼저 다가가 환한 웃음으로 한마디 인사말을 건네 보세요." },
    ISFP: { name: "평화로운 예술가", sub: "자유롭게 세상을 그리는 낭만파", desc: "마음이 무척 따뜻하고 온화하며 갈등을 싫어합니다. 예술적 감각이 뛰어나며 현재의 순간을 즐기고 아름답게 여길 줄 압니다.", relation: "자신의 주장이나 솔직한 의견을 친구들에게 양보하기만 하지 말고, 나도 '이게 하고 싶어!'라고 솔직하게 요구해 보세요." },
    INFP: { name: "꿈꾸는 탐험가", sub: "따뜻한 감성으로 세상을 칠하는 꿈쟁이", desc: "이해심이 많고 깊은 동정심을 지니고 있으며, 글쓰기나 창의적 활동에서 나만의 개성을 빛냅니다. 이상주의적인 꿈과 가치를 추구합니다.", relation: "상처를 쉽게 받을 수 있으니, 친구의 가벼운 농담이나 비판을 너무 깊게 받아들이지 않고 유연하게 흘려보내는 마음 훈련이 좋습니다." },
    INTP: { name: "기발한 아이디어맨", sub: "끝없는 호기심의 논리 연구가", desc: "세상 모든 것에 의문을 품고 질문하기를 좋아하며, 매우 똑똑하고 논리적으로 문제를 해부합니다. 지식에 대한 열망이 가득합니다.", relation: "모둠 학습 시 논리성만 강조하기보다는 '정말 수고했어!'라며 팀원들의 노고에 공감하고 감싸주는 다정함을 보여주세요." },
    ESTP: { name: "에너지 넘치는 소방관", sub: "두려움 없는 즐거운 행동파", desc: "자신감이 넘치고 활동적이며, 직접 몸으로 부딪치며 배우는 것을 즐깁니다. 유머 감각이 있어 분위기를 항상 신나게 만듭니다.", relation: "행동이 다소 급해 말실수가 생길 수 있으니, 중요한 말을 하기 전에 '1초만 멈추고 생각하기' 규칙을 실천해 보세요." },
    ESFP: { name: "흥겨운 축제 기획자", sub: "친구들에게 웃음을 주는 분위기 메이커", desc: "이야기하는 것을 사랑하고, 밝은 에너지를 뿜어냅니다. 새로운 자극과 사람들을 모아 파티나 놀이를 기획하는 데 탁월합니다.", relation: "공부나 숙제 같은 지루한 태스크를 미루는 경향이 생길 수 있으니, 오늘 할 공부 약속을 마친 뒤 친구와 노는 선약 규칙을 세워 보세요." },
    ENFP: { name: "긍정의 스파크", sub: "기쁨을 전하는 행복 비타민", desc: "매우 활발하고 아이디어가 솟구치며 새로운 도전을 망설이지 않습니다. 긍정적인 힘으로 교실 내 모든 친구들을 뭉치게 만듭니다.", relation: "흥미가 있는 일엔 무섭게 몰입하지만 쉽게 질려하기도 하니, 하나의 일을 시작했다면 끝맺음까지 해내는 끈기가 필요합니다." },
    ENTP: { name: "유쾌한 발명가", sub: "도전적인 생각의 아이디어 대장", desc: "토론하는 것을 좋아하고, 엉뚱하면서도 재미있는 발상을 척척 내놓습니다. 복잡한 고정관념을 깨고 새로운 돌파구를 제시합니다.", relation: "토론이나 대화 중 친구들이 내 의견에 반대하더라도 이기려고 논쟁하기보다 '그럴 수도 있겠다'며 미소 지어 넘기는 매너가 필요합니다." },
    ESTJ: { name: "정의로운 지휘관", sub: "계획대로 척척 이끄는 멋진 리더", desc: "체계적이고 현실적이며, 리더십이 강해 학급 일이나 모둠 계획을 흐트러짐 없이 이끌어 나갑니다. 책임감이 아주 굳건합니다.", relation: "친구들에게 숙제나 역할을 너무 강요하거나 엄하게 다그치기보다, 부드럽고 다정한 어조로 권유하는 말투를 써보세요." },
    ESFJ: { name: "따뜻한 사랑방 주인", sub: "친구들을 하나로 모으는 친절 왕", desc: "친화력이 최고 수준이며 배려심이 많아 주변 친구들의 기념일이나 관심사를 세심하게 잘 챙깁니다. 조화와 협력을 중시합니다.", relation: "친구들의 미움이나 사소한 시기 질투에 상처받아 흔들리기 쉬우니, 세상의 모두가 나를 좋아할 순 없다는 당당함을 마음에 품으세요." },
    ENFJ: { name: "정의로운 평화주의자", sub: "모두를 따뜻하게 감싸주는 햇살 리더", desc: "말을 조리 있게 잘하며, 친구들을 이끄는 카리스마와 따뜻함을 동시에 지녔습니다. 타인의 성장을 돕고 공동체 평화를 지키는 든든한 리더입니다.", relation: "주변 친구들의 문제까지 모두 내 고민처럼 떠안고 끙끙 앓기 쉽습니다. 나 스스로를 돌보고 쉴 수 있는 힐링 시간도 꼭 확보하세요." },
    ENTJ: { name: "대범한 대장군", sub: "어려운 과제도 성취하는 비전 리더", desc: "장기적인 안목을 바탕으로 명확한 목표를 세워 사람들을 이끕니다. 냉철한 판단력과 실행력으로 최고의 성과를 도출해 냅니다.", relation: "성취를 내는 속도가 다소 느린 친구들이 답답하게 느껴져도, 한 발짝 기다려 주며 격려하는 넓은 마음을 발휘하면 최고의 리더가 됩니다." }
};

// 3. 홀랜드 유형별 매핑 데이터 (직업 및 성향)
const hollandDetails = {
    R: {
        name: "실재형 (Realistic)",
        desc: "손재주가 있고 도구나 기계를 다루는 것을 좋아해요. 말보다 행동을 선호하며, 야외 활동이나 체육을 즐기는 든든한 행동대장이에요.",
        jobs: [
            { name: "로봇 공학자", emoji: "🤖", detail: "더 편리한 세상을 위해 지능형 로봇을 연구하고 개발합니다." },
            { name: "스포츠 선수/코치", emoji: "⚽", detail: "몸을 움직여 실력을 기르고 팀워크로 명승부를 펼칩니다." },
            { name: "스마트 농업 전문가", emoji: "🌿", detail: "최첨단 IT 기술을 접목해 식물과 농업의 미래를 키웁니다." }
        ]
    },
    I: {
        name: "탐구형 (Investigative)",
        desc: "질문하는 힘이 강하고 과학적 원리나 수학 문제를 푸는 등 생각의 미로를 탐험하며 원인을 알아내는 공부를 사랑하는 지혜로운 관찰자예요.",
        jobs: [
            { name: "우주 과학자", emoji: "🔬", detail: "신비로운 우주의 비밀을 분석하고 인류의 우주선을 설계합니다." },
            { name: "소프트웨어 개발자", emoji: "💻", detail: "세상에 없는 유용한 앱과 프로그램을 논리적으로 코딩합니다." },
            { name: "데이터 분석가", emoji: "📊", detail: "수많은 정보와 숫자 뒤에 숨겨진 재미있는 의미를 찾습니다." }
        ]
    },
    A: {
        name: "예술형 (Artistic)",
        desc: "규칙에 얽매이기보다 글, 그림, 음악 등으로 개성 넘치게 자신을 표현하고 꾸미길 즐기는 톡톡 튀는 감성 예술가예요.",
        jobs: [
            { name: "콘텐츠 크리에이터/디자이너", emoji: "🎨", detail: "나만의 색감과 영상 아이디어로 시각 디자인을 구현합니다." },
            { name: "웹툰 작가 / 시나리오 작가", emoji: "✍️", detail: "무한한 상상력을 발휘해 재미있는 스토리와 캐릭터를 창조합니다." },
            { name: "음악/미술 치료사", emoji: "🎵", detail: "예술 활동을 통해 사람들의 지친 마음을 위로하고 치유합니다." }
        ]
    },
    S: {
        name: "사회형 (Social)",
        desc: "사람들을 도울 때 보람을 느끼고 친구들 사이에서 중재를 잘하며, 다정다감하고 공감 능력이 뛰어난 따뜻한 마음의 봉사자예요.",
        jobs: [
            { name: "초등/유치원 교사", emoji: "👩‍🏫", detail: "어린이들의 재능을 발견해 주고 건강하게 자라도록 가르칩니다." },
            { name: "아동 심리 상담사", emoji: "🤝", detail: "마음이 힘든 친구들의 목소리를 귀담아듣고 해결을 돕습니다." },
            { name: "의료 보건 전문가", emoji: "🏥", detail: "아픈 환자들을 치료하며 따뜻한 간호와 보살핌을 제공합니다." }
        ]
    },
    E: {
        name: "진취형 (Enterprising)",
        desc: "친구들을 이끌고 목표를 향해 달리는 리더십이 뛰어나며 설득력과 모험심이 풍부하고 발표에 능숙한 카리스마 대장이에요.",
        jobs: [
            { name: "스타트업 창업가 (CEO)", emoji: "💼", detail: "혁신적인 사업 구상을 현실로 만들어 사람들에게 가치를 제공합니다." },
            { name: "아나운서 / 쇼호스트", emoji: "🎤", detail: "목소리와 전달력으로 정보를 전하고 대중을 효과적으로 설득합니다." },
            { name: "글로벌 마케팅 기획자", emoji: "📈", detail: "기발한 전략으로 상품의 우수성을 널리 알리고 홍보합니다." }
        ]
    },
    C: {
        name: "관습형 (Conventional)",
        desc: "노트 필기나 다이어리를 깔끔하게 정리하고, 규칙을 정확하게 수행하며, 성실하고 꼼꼼한 정리 정돈의 끝판왕이에요.",
        jobs: [
            { name: "정보 관리 전문가 (사서)", emoji: "📚", detail: "귀중한 지식과 도서 자료들을 쓰기 쉽도록 분류하고 보관합니다." },
            { name: "행정 공무원", emoji: "🏛️", detail: "나라의 복지와 규칙이 안전하게 작동하도록 행정 문서를 관리합니다." },
            { name: "회계/재무 분석가", emoji: "💰", detail: "기업과 가계의 돈 흐름을 한 치의 오차 없이 꼼꼼하게 기록합니다." }
        ]
    }
};

// 4. 상태 관리 변수 및 클라우드 설정
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw9k4uYURcyd9X8gaV_cJ2awdRUK4xe1lWjYw-GRsWoM0ac7UKE1jC0-_KELpvJrKmJOA/exec"; //여기에 Google Apps Script 웹 앱 배포 URL을 입력하세요.
let studentSchool = "";
let studentName = "";
let studentGrade = "5";
let studentClass = "1";
let currentQuestionIndex = 0;
let answers = {}; // { questionId: answerValue }
let radarChartInstance = null;
let viewMode = "student"; // 'student' 또는 'admin' (결과 조회 모드)
let currentDashboardList = []; // 실시간 데이터 유실 방지용 대시보드 리스트 캐시


// 5. DOM 요소 바인딩
const stepIntro = document.getElementById("step-intro");
const stepSurvey = document.getElementById("step-survey");
const stepLoading = document.getElementById("step-loading");
const stepReport = document.getElementById("step-report");
const stepAdminLogin = document.getElementById("step-admin-login");
const stepAdminDashboard = document.getElementById("step-admin-dashboard");

const btnStart = document.getElementById("btn-start");
const btnPrev = document.getElementById("btn-prev");
const btnPrint = document.getElementById("btn-print");
const btnRestart = document.getElementById("btn-restart");
const btnGotoAdmin = document.getElementById("btn-goto-admin");
const btnAdminLoginSubmit = document.getElementById("btn-admin-login-submit");
const btnAdminLoginCancel = document.getElementById("btn-admin-login-cancel");
const btnAdminLogout = document.getElementById("btn-admin-logout");
const btnAdminExcel = document.getElementById("btn-admin-excel");
const btnBackToDashboard = document.getElementById("btn-back-to-dashboard");

const inputSchool = document.getElementById("student-school");
const inputClass = document.getElementById("student-class");
const inputName = document.getElementById("student-name");
const selectGrade = document.getElementById("student-grade");
const inputAdminUser = document.getElementById("admin-username");
const inputAdminPw = document.getElementById("admin-password");

const adminTableBody = document.getElementById("admin-table-body");
const adminEmptyMessage = document.getElementById("admin-empty-message");
const statTotalCount = document.getElementById("stat-total-count");
const statTopMbti = document.getElementById("stat-top-mbti");
const statTopHolland = document.getElementById("stat-top-holland");

const progressText = document.getElementById("progress-text");
const progressBarFill = document.getElementById("progress-bar-fill");
const questionCard = document.getElementById("question-card");
const questionCategory = document.getElementById("question-category");
const questionTitle = document.getElementById("question-title");
const optionButtons = document.querySelectorAll(".btn-option");

// 6. 이벤트 리스너 등록
function init() {
    btnStart.addEventListener("click", startSurvey);
    btnPrev.addEventListener("click", prevQuestion);
    btnPrint.addEventListener("click", () => window.print());
    btnRestart.addEventListener("click", restartTest);
    
    // 관리자 관련 리스너 등록
    btnGotoAdmin.addEventListener("click", showAdminLogin);
    btnAdminLoginSubmit.addEventListener("click", checkAdminLogin);
    btnAdminLoginCancel.addEventListener("click", cancelAdminLogin);
    btnAdminLogout.addEventListener("click", logoutAdmin);
    btnAdminExcel.addEventListener("click", exportExcel);
    btnBackToDashboard.addEventListener("click", backToAdminDashboard);

    optionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const val = parseInt(button.getAttribute("data-value"));
            handleAnswer(val);
        });
    });

    // 엔터키 입력 시 인트로 시작
    inputName.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            startSurvey();
        }
    });

    // 관리자 비밀번호 입력 후 엔터 시 로그인
    inputAdminPw.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            checkAdminLogin();
        }
    });

    // 진로활동 특기사항 모달 이벤트 등록
    const btnModalCopy = document.getElementById("btn-modal-copy");
    if (btnModalCopy) {
        btnModalCopy.addEventListener("click", copyCareerNoteText);
    }
    const careerModalText = document.getElementById("career-modal-text");
    const careerModalCharCount = document.getElementById("career-modal-char-count");
    if (careerModalText && careerModalCharCount) {
        careerModalText.addEventListener("input", () => {
            careerModalCharCount.innerText = `${careerModalText.value.length}자`;
        });
    }
    const careerModal = document.getElementById("career-note-modal");
    if (careerModal) {
        careerModal.addEventListener("click", (e) => {
            if (e.target === careerModal) {
                closeCareerModal();
            }
        });
    }
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeCareerModal();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

// 7. 설문 검사 시작
function startSurvey() {
    studentSchool = inputSchool.value.trim();
    studentName = inputName.value.trim();
    studentGrade = selectGrade.value;
    studentClass = inputClass.value.trim();

    if (!studentSchool) {
        alert("학교명을 입력해 주세요! 🏫");
        inputSchool.focus();
        return;
    }
    if (!studentClass) {
        alert("학급(반)을 입력해 주세요! ✏️");
        inputClass.focus();
        return;
    }
    if (!studentName) {
        alert("이름을 입력해 주세요! 😊");
        inputName.focus();
        return;
    }

    // 폼 초기화
    currentQuestionIndex = 0;
    answers = {};

    // 인트로 아웃 -> 설문 인
    transitionStep(stepIntro, stepSurvey);
    showQuestion();
}

// 8. 문항 표시 함수
function showQuestion() {
    const q = questions[currentQuestionIndex];
    
    // 이전 버튼 제어
    if (currentQuestionIndex === 0) {
        btnPrev.style.visibility = "hidden";
    } else {
        btnPrev.style.visibility = "visible";
    }

    // 프로그레스 바 계산
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarFill.style.width = `${progressPercent}%`;
    progressText.innerText = `질문 ${currentQuestionIndex + 1} / ${questions.length}`;

    // 카드 내용 교체 모션 (슬라이드 애니메이션 효과)
    questionCard.className = "question-card slide-in-right";
    
    setTimeout(() => {
        questionCard.className = `question-card`;
        // 카테고리 뱃지 세팅
        questionCategory.innerText = q.category;
        questionCategory.className = `category-badge ${q.badgeClass}`;
        // 문항 텍스트 세팅
        questionTitle.innerText = q.text;
    }, 100);
}

// 9. 답변 처리 핸들러
function handleAnswer(val) {
    const currentQ = questions[currentQuestionIndex];
    answers[currentQ.id] = val;

    // 질문 카드 아웃 모션
    questionCard.className = "question-card slide-out-left";

    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            // 설문 종료 -> 로딩 화면으로 진입
            runAnalysis();
        }
    }, 250);
}

// 10. 이전 문항으로 복구
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// 11. 스크린 전환 유틸리티
function transitionStep(fromSection, toSection) {
    fromSection.classList.remove("active");
    setTimeout(() => {
        fromSection.style.display = "none";
        toSection.style.display = "block";
        setTimeout(() => {
            toSection.classList.add("active");
        }, 50);
    }, 500);
}

// 12. 분석 시뮬레이션 및 데이터 도출
function runAnalysis() {
    // 로딩화면 진입
    document.getElementById("loading-student-name").innerText = studentName;
    transitionStep(stepSurvey, stepLoading);

    // 로딩 진행 스태거드 텍스트 렌더링
    const s1 = document.getElementById("loading-status-1");
    const s2 = document.getElementById("loading-status-2");
    const s3 = document.getElementById("loading-status-3");
    const s4 = document.getElementById("loading-status-4");

    // 상태 초기화
    [s1, s2, s3, s4].forEach(el => el.classList.remove("done"));

    setTimeout(() => s1.classList.add("done"), 600);
    setTimeout(() => s2.classList.add("done"), 1200);
    setTimeout(() => s3.classList.add("done"), 1800);
    setTimeout(() => {
        s4.classList.add("done");
        setTimeout(() => {
            // 로딩 종료 -> 결과화면 이동
            renderReport();
        }, 500);
    }, 2400);
}

// 13. 리포트 데이터 바인딩 및 렌더링
function renderReport() {
    // A. 이름 및 메타 데이터 세팅
    document.getElementById("report-student-name").innerText = studentName;
    document.getElementById("report-student-school").innerText = studentSchool;
    document.getElementById("report-student-grade").innerText = studentGrade;
    document.getElementById("report-student-class").innerText = studentClass;
    
    const now = new Date();
    document.getElementById("report-date").innerText = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}`;

    // B. MBTI 점수 연산
    // B. MBTI 점수 연산 (subDimension 대칭형 루프 계산 방식)
    let mbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    questions.forEach(q => {
        if (q.type === "mbti" && q.subDimension) {
            const val = answers[q.id] || 3;
            mbtiScores[q.subDimension] += val;
        }
    });

    let mbti = "";
    mbti += (mbtiScores.E >= mbtiScores.I) ? "E" : "I";
    mbti += (mbtiScores.N >= mbtiScores.S) ? "N" : "S";
    mbti += (mbtiScores.F >= mbtiScores.T) ? "F" : "T";
    mbti += (mbtiScores.J >= mbtiScores.P) ? "J" : "P";

    const mbtiResult = mbtiDetails[mbti] || mbtiDetails["ENFP"];
    
    document.getElementById("res-mbti-code").innerText = mbti;
    document.getElementById("res-mbti-name").innerText = mbtiResult.name;
    document.getElementById("res-mbti-desc").innerHTML = `<strong>★ ${mbtiResult.sub} ★</strong><br><br>${mbtiResult.desc}`;
    document.getElementById("res-mbti-relation").innerText = mbtiResult.relation;

    // C. 홀랜드 RIASEC 흥미 분석 연산 (questions 속성 기반 동적 집계)
    const hollandScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    questions.forEach(q => {
        if (q.type === "holland" && q.dimension) {
            const val = answers[q.id] || 3;
            hollandScores[q.dimension] += val;
        }
    });

    // 가장 높은 유형과 두 번째 높은 유형 찾기
    const sortedHolland = Object.keys(hollandScores).sort((a, b) => hollandScores[b] - hollandScores[a]);
    const firstType = sortedHolland[0];
    const secondType = sortedHolland[1];

    const holland1stDetail = hollandDetails[firstType];
    const holland2ndDetail = hollandDetails[secondType];

    document.getElementById("res-holland-1st").innerText = `1순위: ${holland1stDetail.name}`;
    document.getElementById("res-holland-2nd").innerText = `2순위: ${holland2ndDetail.name}`;

    document.getElementById("res-holland-desc").innerHTML = 
        `우리 ${studentName} 학생은 <strong>'${holland1stDetail.name}'</strong> 성향이 가장 뚜렷하게 발달해 있습니다. ${holland1stDetail.desc}<br><br>` + 
        `보조적으로 발달해 있는 <strong>'${holland2ndDetail.name}'</strong>(${holland2ndDetail.desc.substring(0, 15)}...)과 결합해 보면, 두 흥미 영역의 시너지가 훌륭합니다.`;

    // 추천 직업 리스트 바인딩
    const jobsListContainer = document.getElementById("res-jobs-list");
    jobsListContainer.innerHTML = "";
    
    const recommendedJobs = [
        ...holland1stDetail.jobs.slice(0, 2),
        ...holland2ndDetail.jobs.slice(0, 1)
    ];

    recommendedJobs.forEach(job => {
        const jobDiv = document.createElement("div");
        jobDiv.className = "job-item";
        jobDiv.innerHTML = `
            <span class="job-emoji">${job.emoji}</span>
            <div class="job-info">
                <div class="job-name">${job.name}</div>
                <div class="job-detail">${job.detail}</div>
            </div>
        `;
        jobsListContainer.appendChild(jobDiv);
    });

    // D. 가치관 우선 순위 3개 선별 (6개 가치관 동적 매핑)
    const valueScores = [
        { name: "창의성", key: "creativity", emoji: "💡", desc: "나만의 독창적인 아이디어로 생각하는 것", val: 3 },
        { name: "협동/관계", key: "cooperation", emoji: "🤝", desc: "친구들과 다 같이 힘을 모아 함께 일하는 것", val: 3 },
        { name: "자율성", key: "autonomy", emoji: "🧗", desc: "스스로 계획을 세우고 마음껏 결정하는 것", val: 3 },
        { name: "성취", key: "achievement", emoji: "🏆", desc: "어려운 과제를 끝까지 노력하여 완성시키는 것", val: 3 },
        { name: "이타심/봉사", key: "altruism", emoji: "💝", desc: "남을 이롭게 하고 행복하게 돕는 것", val: 3 },
        { name: "지도력", key: "influence", emoji: "📢", desc: "내 의견으로 다른 사람이나 집단을 변화시키는 것", val: 3 }
    ];

    questions.forEach(q => {
        if (q.type === "value") {
            const match = valueScores.find(v => v.key === q.dimension);
            if (match) {
                match.val = answers[q.id] || 3;
            }
        }
    });

    // 가치관 점수 내림차순 정렬
    valueScores.sort((a, b) => b.val - a.val);

    const valuesContainer = document.getElementById("res-values-container");
    valuesContainer.innerHTML = "";

    const ranks = ["1순위", "2순위", "3순위"];
    for (let i = 0; i < 3; i++) {
        const item = valueScores[i];
        const valCard = document.createElement("div");
        valCard.className = "value-badge";
        valCard.innerHTML = `
            <div class="value-rank">${ranks[i]}</div>
            <div class="value-emoji">${item.emoji}</div>
            <div class="value-name">${item.name}</div>
            <div class="value-desc">${item.desc}</div>
        `;
        valuesContainer.appendChild(valCard);
    }

    // E. 학습 및 생활 습관 6대 평가 (자기 조절 지표 추가)
    const habitData = [
        { name: "계획성 (Plan)", key: "plan", val: 3 },
        { name: "집중력 (Focus)", key: "focus", val: 3 },
        { name: "정리정돈 (Desk)", key: "management", val: 3 },
        { name: "모둠협동 (Team)", key: "cooperation", val: 3 },
        { name: "시간관리 (Time)", key: "feedback", val: 3 },
        { name: "자기 조절 (Control)", key: "self_control", val: 3 }
    ];

    questions.forEach(q => {
        if (q.type === "habit") {
            const match = habitData.find(h => h.key === q.dimension);
            if (match) {
                match.val = answers[q.id] || 3;
            }
        }
    });

    const habitGrid = document.getElementById("res-habit-grid");
    habitGrid.innerHTML = "";

    const habitFeedbacks = {
        plan: {
            high: "계획표를 세워 행동하는 능력이 뛰어나요. 시간을 낭비하지 않고 하루를 알차게 구성합니다.",
            low: "하루 공부를 시작하기 전 '오늘 해야 할 일 딱 3가지'를 노트나 플래너에 적고 완료 후 체크해 보세요."
        },
        focus: {
            high: "공부를 시작하면 고도의 집중력을 발휘하는 훌륭한 과제 집착력이 있습니다.",
            low: "공부할 때 스마트폰을 다른 방에 두거나 25분 집중, 5분 휴식을 반복하는 타이머 공부 방법을 추천해요."
        },
        management: {
            high: "내 방과 책상을 매일 깔끔하게 정리하는 습관은 머릿속 생각을 정리하는 데도 큰 밑거름이 됩니다.",
            low: "매일 저녁 가방을 싸두거나 책상 위에는 지금 공부할 책 한 권만 남겨 두는 미니멀 정돈부터 시도해 보세요."
        },
        cooperation: {
            high: "모둠 수업 시 친구들의 다양한 목소리를 귀담아듣고 조화롭게 양보할 줄 아는 배려심의 리더입니다.",
            low: "그룹 대화에서 친구들의 주장을 자르지 말고 일단 '와, 그것도 좋은 방법이다!'라고 공감해 주는 리액션 연습이 도움됩니다."
        },
        feedback: {
            high: "시간 약속을 잘 지킬 뿐 아니라 한 행동을 돌아보고 분석할 줄 아는 성숙한 관리 능력을 가졌습니다.",
            low: "외출이나 등교 전 '10분 일찍 출발 알람'을 미리 스마트폰에 켜두고 여유 있게 움직이는 습관을 길러 보아요."
        },
        self_control: {
            high: "감정이나 욕구를 다스리고 해야 할 일을 스스로 조절하여 해내는 자제력이 모범적입니다.",
            low: "스마트폰 사용 시간 제한 모드를 켜거나, 힘든 일이 있을 땐 3번 깊이 숨을 쉬며 감정을 조절해 보세요."
        }
    };

    habitData.forEach(item => {
        let statusClass = "status-good";
        let statusText = "양호";
        let fb = habitFeedbacks[item.key].high;

        if (item.val === 5) {
            statusClass = "status-excellent";
            statusText = "우수";
        } else if (item.val <= 3) {
            statusClass = "status-need-effort";
            statusText = "노력 필요";
            fb = habitFeedbacks[item.key].low;
        }

        const habitDiv = document.createElement("div");
        habitDiv.className = "habit-item";
        habitDiv.innerHTML = `
            <div class="habit-header-row">
                <span class="habit-label">${item.name}</span>
                <span class="habit-status-badge ${statusClass}">${statusText}</span>
            </div>
            <p class="habit-feedback-text">${fb}</p>
        `;
        habitGrid.appendChild(habitDiv);
    });

    // F. Chart.js 레이더 차트 렌더링
    if (radarChartInstance) {
        radarChartInstance.destroy();
    }

    const ctx = document.getElementById('hollandRadarChart').getContext('2d');
    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['실재형(R)', '탐구형(I)', '예술형(A)', '사회형(S)', '진취형(E)', '관습형(C)'],
            datasets: [{
                label: '나의 흥미 점수',
                data: [
                    hollandScores.R,
                    hollandScores.I,
                    hollandScores.A,
                    hollandScores.S,
                    hollandScores.E,
                    hollandScores.C
                ],
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 0.8)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(226, 232, 240, 0.8)'
                    },
                    grid: {
                        color: 'rgba(226, 232, 240, 0.8)'
                    },
                    suggestedMin: 2,
                    suggestedMax: 10,
                    ticks: {
                        stepSize: 2,
                        display: false // 라벨 숫자 가림
                    },
                    pointLabels: {
                        font: {
                            family: 'Pretendard',
                            size: 12,
                            weight: '700'
                        },
                        color: '#475569'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // G. AI 종합 진단 요약문 렌더링
    let summaryText = `<strong>${studentName}</strong> 학생은 성격적으로 <strong>'${mbtiResult.name}'</strong>의 특성을 뚜렷하게 갖고 있으며, 친구 관계에서 ${mbtiResult.relation.split('도움이 됩니다.')[0]}도움을 주는 긍정적인 면모가 돋보입니다. `;
    summaryText += `진로 흥미 측면에서는 <strong>'${holland1stDetail.name}'</strong> 성향과 <strong>'${holland2ndDetail.name}'</strong> 성향이 유기적으로 결합되어 있어, `;
    
    // Holland 조합별 시너지 해석
    let hollandSynergy = "";
    if (firstType === 'R') hollandSynergy = "실질적이고 구체적인 사물이나 도구를 다루는 주도적 실행 속에서 ";
    else if (firstType === 'I') hollandSynergy = "원리를 탐구하고 지식을 분석하는 깊이 있는 지적 자극 속에서 ";
    else if (firstType === 'A') hollandSynergy = "규칙에 얽매이지 않고 자유롭게 상상하고 자신을 표출하는 기회 속에서 ";
    else if (firstType === 'S') hollandSynergy = "사람들의 성장을 돕고 따뜻하게 대화와 공감을 나누는 보람 속에서 ";
    else if (firstType === 'E') hollandSynergy = "주도적으로 목표를 이끌고 사람들에게 영향을 미치는 리더십의 발휘 속에서 ";
    else if (firstType === 'C') hollandSynergy = "정돈되고 체계적인 계획과 안정적 질서를 성실하게 준수하는 과정 속에서 ";
    
    summaryText += `${hollandSynergy}자신의 잠재력을 가장 잘 실현하는 경향이 있습니다. `;
    summaryText += `아울러 공부와 진로의 핵심 기준이 되는 가치관으로는 <strong>'${valueScores[0].name}'</strong>(이)가 최우선 순위로 도출되어, 본인만의 독특한 자아 실현이 학습 동기의 주축이 됩니다. `;
    
    // 습관 강점 & 약점 추출
    let strongestHabit = [...habitData].sort((a,b) => b.val - a.val)[0];
    let weakestHabit = [...habitData].sort((a,b) => a.val - b.val)[0];
    
    summaryText += `현재 학습 습관 측면을 살펴보면, <strong>'${strongestHabit.name.split(' ')[0]}'</strong> 영역에서 뛰어난 역량(점수: ${strongestHabit.val}점)을 보여 공부 전반의 든든한 밑거름이 되고 있습니다. 다만 상대적으로 자기 관리가 조금 아쉬울 수 있는 <strong>'${weakestHabit.name.split(' ')[0]}'</strong>(점수: ${weakestHabit.val}점) 영역의 보완을 유도한다면 다가올 중학교 학습 환경에서도 매우 안정적이고 자기 주도적인 성장을 이어갈 것으로 기대됩니다.`;
    
    document.getElementById("res-summary-text").innerHTML = summaryText;

    // H. 맞춤형 추천 학습 방법 렌더링
    const learningMethodsData = {
        R: {
            title: "🛠️ 실험 및 실습 기반 직접 체험 학습법",
            desc: "실재형(R) 성향이 높은 학생은 눈으로만 책을 읽기보다 수학 교구를 직접 만져보거나, 과학 도구를 조립해 보며 작동 원리를 감각적으로 익히는 체험식 공부가 최고의 성과를 냅니다. 오답 노트를 작성할 때도 가위로 오려 붙이거나 형광펜을 활용해 직접 '만드는 손맛'을 살린 서브노트를 제작해 보세요."
        },
        I: {
            title: "🧠 개념 구조화 및 심화 탐구 독서 학습법",
            desc: "탐구형(I) 성향의 학생은 단순 암기 방식보다 '왜 이런 공식이 나왔을까?' 하는 본질적 이유를 스스로 이해해야 흥미가 생깁니다. 마인드맵을 이용해 개념 간 인과관계를 마디 별로 구조화해 공부하거나, 주간 흥미 주제를 하나 정해 백과사전이나 도서관 자료를 파고드는 자율 탐구 공부 시간이 매우 효과적입니다."
        },
        A: {
            title: "🎨 비주얼 씽킹 & 스토리텔링 스토리 암기법",
            desc: "예술형(A) 학생은 텍스트 위주의 단순 암기보다 그림이나 구조화된 도식, 스토리로 기억하는 시각화 및 서사 공부가 매우 적합합니다. 역사나 사회 과목을 공부할 때 사건 흐름을 만화 콘티처럼 그리거나 자신만의 가상 소설/역할극으로 재해석하여 연상 기억법을 적극 활용하면 즐겁게 집중할 수 있습니다."
        },
        S: {
            title: "👥 또래 가르치기 및 그룹 토의 학습법",
            desc: "사회형(S) 학생은 혼자 고립되어 공부하는 것보다 '함께 소통할 때' 뇌가 가장 활성화됩니다. 부모님이나 친구들에게 오늘 배운 핵심 개념을 알기 쉽게 설명해 주는 '선생님 놀이(또래 가르치기)' 학습이나 모둠 친구들과 질의응답을 나누는 스터디 방식을 적용하면 학습 효율이 수직 상승합니다."
        },
        E: {
            title: "🏆 목표 달성 퀘스트 및 게임화(Gamification) 공부법",
            desc: "진취형(E) 성향은 명확한 보상과 성취 목표가 제시될 때 강력한 몰입을 보입니다. 긴 공부 시간을 통째로 계획하기보다, '30분 수학 5문제 풀기 퀘스트 성공 시 휴식'과 같은 미션 수행 방식으로 공부 일정을 설계하세요. 친구들과의 선의의 스터디 플래너 경쟁 등 경쟁적 요소가 동기부여에 긍정적으로 작용합니다."
        },
        C: {
            title: "📋 꼼꼼한 시간 기록 및 템플릿 기반 오답 정렬 학습법",
            desc: "관습형(C) 성향은 체계와 안정감을 제공하는 공부 환경을 선호합니다. 정돈된 주간 계획서 양식을 활용하여 시간 단위로 실천 내용을 기록하는 플래너 활용 학습이 잘 맞습니다. 오답을 정리할 때도 단원별, 난이도별 규칙을 명확히 설정하고 꼼꼼하게 분류 및 라벨링하여 보관하면 복습 능력이 훌륭하게 강화됩니다."
        }
    };

    const learningContainer = document.getElementById("res-learning-methods");
    learningContainer.innerHTML = "";

    const method1 = learningMethodsData[firstType] || learningMethodsData["I"];
    const method2 = learningMethodsData[secondType] || learningMethodsData["S"];

    [method1, method2].forEach(method => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "learning-method-item";
        itemDiv.innerHTML = `
            <div class="learning-method-title">${method.title}</div>
            <div class="learning-method-desc">${method.desc}</div>
        `;
        learningContainer.appendChild(itemDiv);
    });

    // I. 교사 및 학부모 조언 가이드 렌더링
    const teacherAdviceData = {
        E: "모둠 활동에서 발표자나 이끄미 역할을 부여해 주어 활발한 에너지를 건강하게 발산할 기회를 주세요. 수업 중 적극적인 질문 참여를 독려하고 칭찬해 주는 피드백이 효과적입니다.",
        I: "강제적인 단체 발표나 앞장서서 리드하는 활동보다는 차분히 준비해서 글이나 조용한 결과물로 제출할 기회를 먼저 주세요. 의견을 물어볼 때는 충분히 생각할 텀을 주시는 편이 좋습니다.",
        R: "말 위주의 지시보다 실질적인 그림자료나 도구 조작 활동을 포함해 수업을 진행해 주세요. 성실히 규칙을 준수하는 과정 자체를 인정해 주는 실리적인 칭찬이 잘 작동합니다.",
        I_hol: "답을 바로 알려주기보다 힌트를 제공하여 스스로 탐구하고 문제를 증명해 볼 수 있는 자율 과학/수학 퀘스트를 제안하시면 학업 성취욕이 매우 상승합니다.",
        A: "글짓기, 그리기, 발표 등 다양한 표현 양식에서 아동 고유의 다소 엉뚱하거나 개성 있는 시각을 수용해 주시고, 고정된 양식의 틀에 가두지 않도록 격려해 주십시오.",
        S: "친구나 급우 간의 관계 속에서 소외감을 느끼지 않도록 관찰해 주시고, 교실 내 갈등 상황 발생 시 아동을 갈등 해결의 도우미나 중재자로 투입해 주시면 책임감이 커집니다.",
        E_hol: "학급 내에서 자율적인 반장 선거, 모둠장 선거 등에 나서도록 격려해 주시되, 혹여 결과에 너무 과몰입하여 좌절하지 않도록 페어플레이의 아름다움을 깨닫게 조력해 주세요.",
        C: "과제 제출 기한이나 평가 기준을 아주 구체적이고 명확한 루브릭으로 제시해 주시면 큰 안정감을 느끼고, 서류 정리나 학급 물건 관리를 성실히 도우려 할 것입니다."
    };

    const parentAdviceData = {
        E: "가정에서 아이가 밖에서 겪은 재미있는 사건들을 조목조목 이야기할 때 귀찮아하지 마시고 풍부한 리액션으로 맞받아쳐 주셔서 소통 창구를 열어주시는 것이 대단히 중요합니다.",
        I: "아동이 방과 후 혼자 방 안에서 집중하거나 책을 읽고 쉴 때 노크 없이 불쑥 들어가기보다 '혼자만의 안전한 충전 시간'을 물리적으로 보호해 주시길 권장합니다.",
        F: "아동의 공부 실수를 지적하기 전 '속상했겠구나'라는 아동의 감정을 1순위로 만져 준 후 규칙적인 행동 교정을 언급해 주셔야 상처를 받지 않고 순종합니다.",
        T: "꾸중이나 훈육 시 막연히 '왜 그랬니?'라고 화를 내는 것보다, '너의 이러한 행동(원인)으로 인해 이런 규칙 위반(결과)이 일어났단다' 하고 논리정연하고 공평한 룰에 근거해 설명해 주셔야 아동이 설득됩니다.",
        R: "스마트폰이나 조작형 게임기를 과도하게 사용하지 않도록 자연 체험, 야외 스포츠나 캠핑, 가구 조립 등 몸과 오감을 함께 활용하는 아날로그적 주말 취미 활동을 지원해 주세요.",
        I_hol: "아이의 끊임없는 '왜요?' 질문을 성의 없이 흘려듣지 마시고, 관련 다큐멘터리나 과학 도서를 함께 찾으며 백과사전식 대화를 자극해 주시면 두뇌 발달에 최적입니다.",
        A: "정돈되지 않은 아동의 방이나 독특한 패션/취미 선택을 단정치 못하다고 다그치기보단, 아동 나름의 예술적 표현과 개성 표출로 해석하고 넓게 용인해 주실 필요가 있습니다.",
        S: "자신보다 남을 너무 챙기다 속앓이를 하는 경향이 있으므로, 가정에서 '너의 마음이 가장 소중해'라며 아동 본인의 욕구와 감정을 표현하도록 특별히 격려해 주세요.",
        E_hol: "아이가 원하는 용돈 협상이나 용품 구매 요구가 있을 때 논리적인 근거를 들어 스스로 프레젠테이션하게 한 뒤 보상을 해주는 합리적인 동기부여가 훌륭한 리더로 성장시킵니다.",
        C: "아동이 자기 물건의 보관 규칙을 스스로 정하도록 도우시고, 갑작스러운 가족 휴가 계획 변경이나 일정 취소 시 아동이 당황하여 위축되지 않도록 사전에 상황을 충분히 상세히 미리 공유해 주세요."
    };

    const guideContainer = document.getElementById("res-guide-box");
    guideContainer.innerHTML = "";

    // E/I 및 Holland 성향에 따른 교사 조언
    const teacherAdvice1 = teacherAdviceData[mbti[0]] || teacherAdviceData["E"];
    const teacherAdvice2 = teacherAdviceData[firstType] || teacherAdviceData["S"];

    // F/T 및 Holland 성향에 따른 학부모 조언
    const parentAdvice1 = parentAdviceData[mbti[2]] || parentAdviceData["F"];
    const parentAdvice2 = parentAdviceData[firstType] || parentAdviceData["S"];

    const teacherSection = document.createElement("div");
    teacherSection.className = "guide-section";
    teacherSection.innerHTML = `
        <div class="guide-section-title">👩‍🏫 선생님을 위한 지도 가이드</div>
        <ul class="guide-list">
            <li>${teacherAdvice1}</li>
            <li>${teacherAdvice2}</li>
            <li>학생의 성격 코드(${mbti})와 흥미 성향(${firstType}형)의 장점을 이끌 수 있는 과업 위주로 조력해 주세요.</li>
        </ul>
    `;

    const parentSection = document.createElement("div");
    parentSection.className = "guide-section";
    parentSection.innerHTML = `
        <div class="guide-section-title">🏡 학부모를 위한 양육 가이드</div>
        <ul class="guide-list">
            <li>${parentAdvice1}</li>
            <li>${parentAdvice2}</li>
            <li>가장 높은 가치로 나타난 '${valueScores[0].name}' 가치를 일상에서 체감할 수 있도록 아동의 개성적인 도전을 지켜봐 주시고 격려해 주세요.</li>
        </ul>
    `;

    const guideGrid = document.createElement("div");
    guideGrid.className = "guide-container";
    guideGrid.appendChild(teacherSection);
    guideGrid.appendChild(parentSection);
    guideContainer.appendChild(guideGrid);

    // 결과 화면 버튼 제어 및 학생 기록 저장
    if (viewMode === 'admin') {
        btnRestart.style.display = 'none';
        btnBackToDashboard.style.display = 'inline-block';
    } else {
        btnRestart.style.display = 'inline-block';
        btnBackToDashboard.style.display = 'none';
        // 학생이 자율적으로 한 경우에만 저장
        saveStudentResult(studentSchool, studentGrade, studentClass, studentName, mbti, mbtiResult.name, firstType, secondType, answers);
    }

    // 결과화면 스위치
    transitionStep(stepLoading, stepReport);
}

// 14. 테스트 재시작
function restartTest() {
    inputSchool.value = "";
    inputClass.value = "";
    inputName.value = "";
    selectGrade.value = "5";
    studentSchool = "";
    studentClass = "";
    studentName = "";
    
    // 리포트 -> 인트로
    transitionStep(stepReport, stepIntro);
}

// 15. 관리자 시스템 및 LocalStorage 연동 함수군
const ADMIN_ID = "admin";
let adminSessionPassword = ""; // 로그인 검증 성공 시 세션용 비밀번호 동적 저장

// 관리자 로그인 화면 진입
function showAdminLogin() {
    inputAdminUser.value = "";
    inputAdminPw.value = "";
    transitionStep(stepIntro, stepAdminLogin);
    inputAdminUser.focus();
}

// 관리자 로그인 취소
function cancelAdminLogin() {
    transitionStep(stepAdminLogin, stepIntro);
}

// 관리자 로그인 비밀번호 검증 (구글 Apps Script 연동 동적 보안 검증)
function checkAdminLogin() {
    const userId = inputAdminUser.value.trim();
    const userPw = inputAdminPw.value.trim();

    if (userId !== ADMIN_ID) {
        alert("아이디 또는 비밀번호가 올바르지 않습니다. 다시 입력해 주세요! 🔒");
        inputAdminPw.value = "";
        inputAdminPw.focus();
        return;
    }

    if (!GAS_WEB_APP_URL) {
        // 클라우드 비활성화 상태 (Fallback 모드): 로컬 테스트용 비밀번호 매칭
        if (userPw === "admin1204") {
            adminSessionPassword = userPw;
            renderAdminDashboard();
            transitionStep(stepAdminLogin, stepAdminDashboard);
        } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다. 다시 입력해 주세요! 🔒");
            inputAdminPw.value = "";
            inputAdminPw.focus();
        }
        return;
    }

    // 로그인 진행 로딩 표시
    const loginButton = document.getElementById("btn-admin-login-submit");
    const originalText = loginButton.innerText;
    loginButton.innerText = "로그인 중...";
    loginButton.disabled = true;

    // 스프레드시트 서버 단으로 비동기 검증 요청 (비밀번호를 URL 매개변수로 전달)
    fetch(`${GAS_WEB_APP_URL}?pw=${encodeURIComponent(userPw)}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP 오류! 상태 코드: ${res.status}`);
            }
            return res.text();
        })
        .then(text => {
            loginButton.innerText = originalText;
            loginButton.disabled = false;

            let resData;
            try {
                resData = JSON.parse(text);
            } catch (e) {
                console.error("JSON 파싱 실패. 원본 응답:", text);
                throw new Error("서버가 올바른 JSON 형식을 반환하지 않았습니다. (구글 웹 앱 배포 시 '액세스 권한: 모든 사람' 설정을 확인해 주세요)");
            }

            if (resData.status === "success") {
                // 로그인 검증 성공시 세션용 비밀번호에 동적 저장
                adminSessionPassword = userPw;
                saveSavedResults(resData.data || []); // 로컬 캐시 갱신 추가
                renderDashboardWithData(resData.data || []);
                transitionStep(stepAdminLogin, stepAdminDashboard);
            } else {
                alert("비밀번호가 올바르지 않습니다. 다시 입력해 주세요! 🔒");
                inputAdminPw.value = "";
                inputAdminPw.focus();
            }
        })
        .catch(err => {
            loginButton.innerText = originalText;
            loginButton.disabled = false;
            console.error("클라우드 로그인 검증 실패:", err);
            alert(`클라우드 서버 통신 에러!\n\n[오류 원인]: ${err.message}\n\n[확인 사항]:\n1. 스프레드시트의 Apps Script 웹 앱 배포 시 권한을 '모든 사람(Anyone)'으로 설정했는지 확인해 주세요.\n2. 신규 수정된 Code.gs 코드를 스프레드시트에 새로 반영하고 '새 배포'로 배포 버전을 업데이트했는지 확인해 주세요.`);
        });
}

// 관리자 로그아웃
function logoutAdmin() {
    transitionStep(stepAdminDashboard, stepIntro);
}

// 로컬 스토리지에 결과 저장 및 클라우드 업로드
function saveStudentResult(school, grade, classVal, name, mbti, mbtiName, holland1, holland2, answers) {
    const list = getSavedResults();
    const newRecord = {
        id: "res_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        school: school,
        grade: grade,
        class: classVal,
        name: name,
        date: new Date().toLocaleString("ko-KR"),
        mbti: mbti,
        mbtiName: mbtiName,
        holland1: holland1,
        holland2: holland2,
        answers: answers
    };
    list.push(newRecord);
    saveSavedResults(list);

    // 구글 스프레드시트 클라우드 저장 연동
    if (GAS_WEB_APP_URL) {
        fetch(GAS_WEB_APP_URL, {
            method: "POST",
            mode: "no-cors", // Redirect 시 CORS 차단 방지
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify(newRecord)
        })
        .then(() => {
            console.log("구글 스프레드시트 저장 요청 완료 (no-cors)");
        })
        .catch(err => {
            console.error("구글 스프레드시트 저장 실패:", err);
        });
    }
}

// 로컬 스토리지에서 리스트 가져오기
function getSavedResults() {
    const data = localStorage.getItem("career_explorer_results");
    return data ? JSON.parse(data) : [];
}

// 로컬 스토리지에 리스트 덮어쓰기
function saveSavedResults(list) {
    localStorage.setItem("career_explorer_results", JSON.stringify(list));
}

// 대시보드로 돌아가기
function backToAdminDashboard() {
    viewMode = "student"; // 모드 복구
    btnRestart.style.display = 'inline-block';
    btnBackToDashboard.style.display = 'none';
    
    renderAdminDashboard(); // 혹시나 갱신
    transitionStep(stepReport, stepAdminDashboard);
}

// 대시보드 통계 및 명단 렌더링
function renderAdminDashboard() {
    const loadingIndicator = document.getElementById("admin-loading-indicator");
    
    if (GAS_WEB_APP_URL) {
        // 로딩 안내 노출 및 필드 초기화
        if (loadingIndicator) loadingIndicator.style.display = "block";
        adminEmptyMessage.style.display = "none";
        adminTableBody.innerHTML = "";
        
        statTotalCount.innerText = "로딩 중...";
        statTopMbti.innerText = "로딩 중...";
        statTopHolland.innerText = "로딩 중...";
        
        fetch(`${GAS_WEB_APP_URL}?pw=${encodeURIComponent(adminSessionPassword)}`)
            .then(res => res.json())
            .then(resData => {
                if (loadingIndicator) loadingIndicator.style.display = "none";
                
                if (resData.status === "success") {
                    const list = resData.data || [];
                    saveSavedResults(list); // 로컬 캐시 갱신
                    renderDashboardWithData(list);
                } else {
                    alert("구글 스프레드시트 데이터 수신 실패: " + resData.message);
                    const list = getSavedResults();
                    renderDashboardWithData(list);
                }
            })
            .catch(err => {
                if (loadingIndicator) loadingIndicator.style.display = "none";
                console.error("클라우드 통신 에러, 로컬 데이터를 표시합니다:", err);
                const list = getSavedResults();
                renderDashboardWithData(list);
            });
    } else {
        if (loadingIndicator) loadingIndicator.style.display = "none";
        const list = getSavedResults();
        renderDashboardWithData(list);
    }
}

// 대시보드 렌더링 보조 함수
function renderDashboardWithData(list) {
    currentDashboardList = list; // 캐시 갱신
    // 1. 통계 수치 계산
    const totalCount = list.length;
    statTotalCount.innerText = `${totalCount}명`;

    if (totalCount === 0) {
        statTopMbti.innerText = "N/A";
        statTopHolland.innerText = "N/A";
        adminTableBody.innerHTML = "";
        adminEmptyMessage.style.display = "block";
        return;
    }

    adminEmptyMessage.style.display = "none";

    // MBTI 및 Holland 분포도 세서 최빈값 추출
    const mbtiCounts = {};
    const hollandCounts = {};

    list.forEach(item => {
        mbtiCounts[item.mbti] = (mbtiCounts[item.mbti] || 0) + 1;
        hollandCounts[item.holland1] = (hollandCounts[item.holland1] || 0) + 1;
    });

    const topMbti = Object.keys(mbtiCounts).sort((a, b) => mbtiCounts[b] - mbtiCounts[a])[0];
    const topHolland = Object.keys(hollandCounts).sort((a, b) => hollandCounts[b] - hollandCounts[a])[0];
    
    const hollandLabels = { R: "실재(R)", I: "탐구(I)", A: "예술(A)", S: "사회(S)", E: "진취(E)", C: "관습(C)" };

    statTopMbti.innerText = `${topMbti}형 (${mbtiCounts[topMbti]}명)`;
    statTopHolland.innerText = `${hollandLabels[topHolland]}형 (${hollandCounts[topHolland]}명)`;

    // 2. 명단 테이블 구축
    adminTableBody.innerHTML = "";
    
    // 최신 등록 순 정렬
    const sortedList = [...list].reverse();

    sortedList.forEach(item => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid #e2e8f0";
        tr.innerHTML = `
            <td style="padding: 14px 20px; font-weight: 500;">${item.school}</td>
            <td style="padding: 14px 20px;">${item.grade}학년 ${item.class}반</td>
            <td style="padding: 14px 20px; font-weight: 700; color:#0f172a;">${item.name}</td>
            <td style="padding: 14px 20px;"><span style="background:#e0e7ff; color:#4338ca; padding:3px 8px; border-radius:4px; font-weight:700; font-size:0.85rem;">${item.mbti}</span></td>
            <td style="padding: 14px 20px;"><span style="background:#dcfce7; color:#15803d; padding:3px 8px; border-radius:4px; font-weight:700; font-size:0.85rem;">${item.holland1}${item.holland2}</span></td>
            <td style="padding: 14px 20px; font-size:0.85rem; color:var(--text-muted);">${formatDateToYMD(item.date)}</td>
            <td style="padding: 14px 20px; text-align: center;">
                <button class="admin-btn-action admin-btn-view" onclick="viewSavedRecord('${item.id}')">보기</button>
                <button class="admin-btn-action admin-btn-note" onclick="generateCareerNote('${item.id}')">진로활동 특기사항</button>
                <button class="admin-btn-action admin-btn-delete" onclick="deleteSavedRecord('${item.id}')">삭제</button>
            </td>
        `;
        adminTableBody.appendChild(tr);
    });
}

// 대시보드에서 개별 학생 리포트 보기
window.viewSavedRecord = function(id) {
    const list = currentDashboardList.length > 0 ? currentDashboardList : getSavedResults();
    const record = list.find(item => item.id === id);
    
    if (!record) {
        alert("기록을 찾을 수 없습니다.");
        return;
    }

    viewMode = "admin"; // 조회용 관리자 모드로 토글
    
    // 학생 인적 사항 전역 변수에 적재
    studentSchool = record.school;
    studentGrade = record.grade;
    studentClass = record.class;
    studentName = record.name;
    answers = record.answers;

    // 로딩 없이 바로 결과 화면 그리기
    renderReport();
};

// 개별 학생 기록 삭제
window.deleteSavedRecord = function(id) {
    const list = getSavedResults();
    const record = list.find(item => item.id === id);
    
    if (!record) return;

    if (confirm(`정말 ${record.name} 학생의 검사 기록을 관리자 데이터에서 영구 삭제하시겠습니까?`)) {
        const filteredList = list.filter(item => item.id !== id);
        saveSavedResults(filteredList);

        if (GAS_WEB_APP_URL) {
            const loadingIndicator = document.getElementById("admin-loading-indicator");
            if (loadingIndicator) loadingIndicator.style.display = "block";

            fetch(GAS_WEB_APP_URL, {
                method: "POST",
                mode: "no-cors", // Redirect 시 CORS 차단 방지 (Failed to fetch 방지)
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify({
                    action: "delete",
                    id: id,
                    pw: adminSessionPassword
                })
            })
            .then(() => {
                if (loadingIndicator) loadingIndicator.style.display = "none";
                alert(`${record.name} 학생의 기록이 클라우드에 삭제 요청되었습니다.`);
                renderAdminDashboard();
            })
            .catch(err => {
                if (loadingIndicator) loadingIndicator.style.display = "none";
                alert("클라우드 삭제 통신 실패: " + err.message);
                renderAdminDashboard();
            });
        } else {
            renderAdminDashboard();
        }
    }
};

// 엑셀(.xlsx) 파일 저장
function exportExcel() {
    const list = getSavedResults();
    if (list.length === 0) {
        alert("내보낼 검사 완료 학생 데이터가 없습니다. 📝");
        return;
    }

    const hollandLabels = { R: "실재형(R)", I: "탐구형(I)", A: "예술형(A)", S: "사회형(S)", E: "진취형(E)", C: "관습형(C)" };

    // 엑셀에 들어갈 데이터 구조 맵핑
    const excelData = list.map(item => ({
        "학교명": item.school,
        "학년": item.grade + "학년",
        "반": item.class + "반",
        "이름": item.name,
        "성격(MBTI)": item.mbti,
        "성격 특징": item.mbtiName,
        "흥미유형(1순위)": hollandLabels[item.holland1] || item.holland1,
        "흥미유형(2순위)": hollandLabels[item.holland2] || item.holland2,
        "검사 일시": item.date
    }));

    // 워크시트 객체 생성
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // 각 열의 최대 길이를 계산하여 열 너비 동적 설정 (한글은 2글자 너비로 취급)
    const cols = Object.keys(excelData[0]).map(key => {
        let maxLen = 0;
        // 헤더 길이 계산
        for (let i = 0; i < key.length; i++) {
            maxLen += key.charCodeAt(i) > 127 ? 2 : 1;
        }
        
        // 데이터 행 길이 계산
        excelData.forEach(row => {
            const val = row[key];
            if (val !== undefined && val !== null) {
                let len = 0;
                const str = val.toString();
                for (let i = 0; i < str.length; i++) {
                    len += str.charCodeAt(i) > 127 ? 2 : 1;
                }
                if (len > maxLen) {
                    maxLen = len;
                }
            }
        });
        
        // 충분한 여백 추가 (+6) 및 최소 너비 설정 (한글 데이터 등이 잘리지 않도록 여유 있게 확보)
        return { wch: Math.max(maxLen + 6, 12) };
    });
    worksheet['!cols'] = cols;

    // 워크북 객체 생성 및 워크시트 결합
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "진로검사 결과");

    // 엑셀 파일 저장 및 파일 다운로드 실행
    XLSX.writeFile(workbook, `진로검사_학급_결과목록_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

// ----------------- 신규 추가 기능: 대시보드 개선 및 진로활동 특기사항 생성 -----------------

// 날짜 포맷 변환 함수 (연도.월.일 형식으로 안전하게 변환)
function formatDateToYMD(dateStr) {
    if (!dateStr) return "";
    
    // "2026. 5. 29. 오후 3:00:00" 등의 포맷에서 숫자 3그룹 매칭
    const matches = dateStr.match(/(\d{4})[\.\-\/\s]+\s*(\d{1,2})[\.\-\/\s]+\s*(\d{1,2})/);
    if (matches) {
        const year = matches[1];
        const month = matches[2].padStart(2, '0');
        const day = matches[3].padStart(2, '0');
        return `${year}.${month}.${day}`;
    }
    
    // Date 객체 파싱 시도
    try {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}.${month}.${day}`;
        }
    } catch (e) {
        console.error("Date parsing error:", e);
    }
    
    // 정규식이나 Date 객체 파싱이 실패하면 한글 로케일에서 날짜 부분만 획득 시도
    const tokens = dateStr.split(" ");
    if (tokens.length >= 3) {
        return tokens.slice(0, 3).join(" ").replace(/\s/g, "");
    }
    return dateStr;
}

// 진로활동 특기사항 생성을 위한 긍정적 MBTI 특징 사전 (100자 제어용)
const mbtiCharacterTraits = {
    ISTJ: "책임감이 강하고 매사에 신중하며 약속을 철저히 지키는",
    ISFJ: "주변 친구들을 따뜻하게 배려하고 타인의 감정에 깊이 공감하는",
    INFJ: "생각이 깊고 상상력이 풍부하며 보이지 않는 곳에서 헌신하는",
    INTJ: "독창적이고 논리적이며 스스로 세운 목표를 끝까지 해내는",
    ISTP: "관찰력이 뛰어나고 다재다능하며 조용히 문제를 해결해 내는",
    ISFP: "마음이 무척 따뜻하고 온화하며 예술적 감각이 돋보이는",
    INFP: "이해심이 많고 깊은 공감 능력을 지니며 개성이 돋보이는",
    INTP: "호기심이 풍부하고 질문을 좋아하며 논리적으로 탐구하는",
    ESTP: "자신감이 넘치고 활동적이며 매사에 활기찬 에너지를 전달하는",
    ESFP: "사교성이 뛰어나고 매력적이며 교실 내 분위기를 밝게 이끄는",
    ENFP: "활발하고 긍정적인 아이디어가 많으며 새로운 도전을 즐기는",
    ENTP: "창의적이고 호기심이 많으며 기발한 아이디어를 잘 제안하는",
    ESTJ: "책임감이 강하고 규칙을 잘 준수하며 계획을 실천하는 리더십을 갖춘",
    ESFJ: "친화력이 뛰어나고 조화를 중시하며 주변을 다정하게 챙기는",
    ENFJ: "따뜻한 성품과 탁월한 대인관계 능력을 바탕으로 리더십을 보여주는",
    ENTJ: "목표가 명확하고 실행력이 굳건하며 사람들을 열정적으로 이끄는"
};

// 홀랜드 RIASEC 흥미 유형 한글 이름 맵핑
const hollandKoreanNames = {
    R: "실재형",
    I: "탐구형",
    A: "예술형",
    S: "사회형",
    E: "진취형",
    C: "관습형"
};

// 홀랜드 유형별 진로 방향 설명 사전 (200자 확보용)
const hollandCareerDirections = {
    R: "실제 기계나 도구 조립 또는 야외 스포츠 및 신체 활동을 수반하는 분야",
    I: "과학적 현상 탐구, 수학적 문제해결이나 원리 분석 연구를 요하는 분야",
    A: "글쓰기, 시각 디자인, 창작 예술 등 자유롭고 개성 있는 감각을 살리는 분야",
    S: "타인 지원, 교육, 소통 및 심리 상담 등 이타적 봉사를 요하는 분야",
    E: "집단 리드, 새로운 도전 기획 및 활발한 마케팅 등을 주도하는 분야",
    C: "정보나 데이터 분류, 계획적 행정 문서 관리 등 체계적 정밀함을 요하는 분야"
};

// 가치관 1순위용 성향 설명 사전
const valueRankDescriptions = {
    creativity: "창의적이고 독창적인 아이디어로 문제를 적극적으로 풀어내려는",
    cooperation: "친구들과 다 같이 힘을 모아 협동하며 공동체 조화를 이루려는",
    autonomy: "외부의 지시보다 스스로 계획하고 자유롭게 주도적으로 결정하려는",
    achievement: "도전적인 과제 앞에서 끈기 있게 집중하여 끝까지 성과를 완수하려는",
    altruism: "남을 배려하고 이웃과 학급 친구들에게 헌신하며 봉사하는 것을 중요히 여기는",
    influence: "자신의 주장과 리더십을 바탕으로 모둠을 긍정적으로 설득하고 이끌어가려는"
};

// 진로활동 특기사항 생성 핵심 함수
window.generateCareerNote = function(id) {
    const list = currentDashboardList.length > 0 ? currentDashboardList : getSavedResults();
    const record = list.find(item => item.id === id);
    if (!record) {
        alert("학생 기록을 찾을 수 없습니다.");
        return;
    }

    const mbti = record.mbti || "ENFP";
    const mbtiInfo = mbtiDetails[mbti];
    const mbtiSub = mbtiInfo ? mbtiInfo.sub : "꿈을 키우는 꿈쟁이";
    
    // 특징 구문 획득
    const trait = mbtiCharacterTraits[mbti] || "성실하고 긍정적인";
    
    // 홀랜드 흥미유형 한글명 획득
    const h1 = hollandKoreanNames[record.holland1] || "실재형";
    const h2 = hollandKoreanNames[record.holland2] || "탐구형";
    const hollandPath = hollandCareerDirections[record.holland1] || "다양한 진로 분야";

    // 가치관 1순위 연산
    const valueScores = [
        { key: "creativity", val: 3 },
        { key: "cooperation", val: 3 },
        { key: "autonomy", val: 3 },
        { key: "achievement", val: 3 },
        { key: "altruism", val: 3 },
        { key: "influence", val: 3 }
    ];

    // 질문 정보에서 가치관 점수를 연계 추출 (하드코딩 인덱스 방지)
    questions.forEach(q => {
        if (q.type === "value") {
            const match = valueScores.find(v => v.key === q.dimension);
            if (match) {
                match.val = record.answers[q.id] || 3;
            }
        }
    });
    valueScores.sort((a, b) => b.val - a.val);
    const topValueKey = valueScores[0].key;
    const valueDesc = valueRankDescriptions[topValueKey] || "스스로 성장하려는";

    // 템플릿 결합 (이름 제외, 생활기록부용 종결 어미 적용, 200자 내외 보강)
    let rawNoteText = `성격유형검사 결과 '${mbtiSub}' 유형으로 ${trait} 성향을 보임. 가치관 조사에서는 ${valueDesc} 마음을 가장 소중하게 생각하는 것으로 분석됨. 온라인 진로검사 결과 ${h1}과 ${h2} 분야에 깊은 흥미를 보이며, 특히 ${hollandPath}에서 탁월한 강점을 발휘하여 앞으로 크게 성장해 나갈 잠재력이 큼.`;

    // 5. 주의사항 용어 필터 적용
    const filteredText = filterCareerNoteText(rawNoteText);

    // 모달창 오픈 및 데이터 세팅
    const modal = document.getElementById("career-note-modal");
    const textarea = document.getElementById("career-modal-text");
    const charCounter = document.getElementById("career-modal-char-count");

    if (modal && textarea && charCounter) {
        textarea.value = filteredText;
        charCounter.innerText = `${filteredText.length}자`;
        modal.classList.add("active");
    }
};

// 단어 필터링 치환 함수
function filterCareerNoteText(text) {
    if (!text) return "";
    let filtered = text;
    // 특정 단어 치환 규칙 반영
    filtered = filtered.replace(/AI/gi, "인공지능");
    filtered = filtered.replace(/MBTI/gi, "성격유형검사");
    filtered = filtered.replace(/커리어넷/gi, "온라인 진로검사");
    
    // 특정 상호명이나 대외 기밀 기관명이 포함되지 않도록 이중 가드
    filtered = filtered.replace(/Google/gi, "구글");
    filtered = filtered.replace(/네이버/gi, "온라인 포털");
    
    return filtered;
}

// 모달창 닫기 함수
window.closeCareerModal = function() {
    const modal = document.getElementById("career-note-modal");
    if (modal) {
        modal.classList.remove("active");
    }
};

// 클립보드 복사 함수
window.copyCareerNoteText = function() {
    const textarea = document.getElementById("career-modal-text");
    if (!textarea) return;

    const textToCopy = textarea.value;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert("특기사항이 클립보드에 성공적으로 복사되었습니다! 📋");
            })
            .catch(err => {
                console.error("Clipboard copy failed:", err);
                fallbackCopyText(textarea);
            });
    } else {
        fallbackCopyText(textarea);
    }
};

// 클립보드 복사 Fallback (일부 구형 웹뷰 혹은 지원되지 않는 브라우저용)
function fallbackCopyText(textarea) {
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 모바일 대응
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert("특기사항이 클립보드에 성공적으로 복사되었습니다! 📋");
        } else {
            alert("복사에 실패했습니다. 직접 선택하여 복사해 주세요.");
        }
    } catch (err) {
        console.error("Fallback copy error:", err);
        alert("복사 기능이 지원되지 않는 브라우저입니다. 직접 텍스트를 선택하여 복사해 주세요.");
    }
}

