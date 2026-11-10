// Food Junction - Complete Menu Database
// Extracted with 100% fidelity from the 16-page official Food Junction Menu Diary

const RESTAURANT_INFO = {
    name: "Food Junction",
    tagline: "Taste That Brings You Together",
    address: "Near Laddo Sweets, Thandi Sadak, Kasganj - 207123",
    phones: ["7017643199", "7017718936"],
    whatsapp: "917017643199",
    orderPhone: "7017643199",
    hours: "11:00 AM - 11:00 PM (All 7 Days)",
    types: ["Dine-in", "Takeaway", "Home Delivery"],
    pureVegNote: "100% Pure Vegetarian Kitchen (Egg curry options prepared in dedicated cookware)"
};

const CATEGORIES = [
    { id: "all", nameEn: "All Items", nameHi: "सभी डिश", icon: "fa-utensils" },
    { id: "main-paneer", nameEn: "Paneer Specials", nameHi: "पनीर विशेष (मेन कोर्स)", icon: "fa-cheese" },
    { id: "main-veg", nameEn: "Veg Gravies & Curries", nameHi: "सब्जियां व कोफ्ता", icon: "fa-carrot" },
    { id: "chaap-gravy", nameEn: "Chaap Gravy", nameHi: "चाप ग्रेवी", icon: "fa-drumstick-bite" },
    { id: "chaap-snacks", nameEn: "Chaap Snacks & Rolls", nameHi: "चाप स्नेक्स व रोल", icon: "fa-scroll" },
    { id: "chinese", nameEn: "Chinese & Starters", nameHi: "चाईनीज व नूडल्स", icon: "fa-bowl-rice" },
    { id: "daal", nameEn: "Daal Specials", nameHi: "दाल विशेष", icon: "fa-fire-burner" },
    { id: "momos", nameEn: "Momos", nameHi: "मोमोस", icon: "fa-cookie-bite" },
    { id: "chilli-potato", nameEn: "Chilli Potato & Starters", nameHi: "चिल्ली पटैटो", icon: "fa-pepper-hot" },
    { id: "tikka-kabab", nameEn: "Tikka & Kababs", nameHi: "टिक्का व कबाब", icon: "fa-cubes-stacked" },
    { id: "pizza", nameEn: "Pizza", nameHi: "पिज्जा", icon: "fa-pizza-slice" },
    { id: "south-indian", nameEn: "South Indian & Snacks", nameHi: "साउथ इण्डियन व पाव भाजी", icon: "fa-bowl-food" },
    { id: "thali", nameEn: "Thali & Meals", nameHi: "थाली", icon: "fa-plate-wheat" },
    { id: "combos", nameEn: "Combos (Rice & Chinese)", nameHi: "कॉम्बो मील्स", icon: "fa-layer-group" },
    { id: "rice", nameEn: "Rice & Biryani", nameHi: "चावल व बिरयानी", icon: "fa-seedling" },
    { id: "roti", nameEn: "Roti & Naan", nameHi: "रोटी, नान व पराठा", icon: "fa-bread-slice" },
    { id: "burgers-bread", nameEn: "Burgers & Sandwiches", nameHi: "बर्गर व सैंडविच", icon: "fa-burger" },
    { id: "soups", nameEn: "Soups", nameHi: "सूप", icon: "fa-mug-hot" },
    { id: "raita-salad", nameEn: "Raita, Salad & Papad", nameHi: "रायता, सलाद व पापड़", icon: "fa-leaf" },
    { id: "beverages", nameEn: "Coffee & Lassi", nameHi: "कॉफी व लस्सी", icon: "fa-glass-water" }
];

const MENU_ITEMS = [
    // ==========================================
    // PAGE 4: MAIN COURSE (पनीर विशेष)
    // ==========================================
    {
        id: "p4_01",
        nameEn: "Paneer Tkatak",
        nameHi: "पनीर टकाटक",
        category: "main-paneer",
        isVeg: true,
        isSpicy: true,
        variants: [{ name: "Half", price: 160 }, { name: "Full", price: 260 }],
        descEn: "Spicy and tangy cottage cheese cubes tossed on hot tawa with diced peppers and onions.",
        descHi: "चटपटा तीखा पनीर क्यूब्स, शिमला मिर्च और प्याज के साथ तवा स्टाइल में पकाया गया।"
    },
    {
        id: "p4_02",
        nameEn: "Shahi Paneer",
        nameHi: "शाही पनीर",
        category: "main-paneer",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 160 }, { name: "Full", price: 260 }],
        descEn: "Royal Mughlai delicacy prepared in a rich, silky cashew nut and aromatic cream gravy.",
        descHi: "शाही काजू और मलाई की मखमली ग्रेवी में तैयार स्वादिष्ट नर्म पनीर।"
    },
    {
        id: "p4_03",
        nameEn: "Paneer Pasanda",
        nameHi: "पनीर पसन्दा",
        category: "main-paneer",
        isVeg: true,
        variants: [{ name: "Half", price: 160 }, { name: "Full", price: 260 }],
        descEn: "Delicately stuffed paneer sandwiches simmered in a luscious aromatic cardamom gravy.",
        descHi: "मावा और मेवों से भरे पनीर के टुकड़े, सुगंधित शाही ग्रेवी में।"
    },
    {
        id: "p4_04",
        nameEn: "Palak Paneer",
        nameHi: "पालक पनीर",
        category: "main-paneer",
        isVeg: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Fresh cottage cheese cubes simmered in spiced, velvety smooth spinach puree with garlic.",
        descHi: "ताजा लहसुनी पालक की गाढ़ी ग्रेवी में नर्म पनीर के टुकड़े।"
    },
    {
        id: "p4_05",
        nameEn: "Achari Paneer",
        nameHi: "अचारी पनीर",
        category: "main-paneer",
        isVeg: true,
        isSpicy: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Cottage cheese cooked with tangy pickling spices including fennel, mustard, and kalonji.",
        descHi: "अचारी मसालों, राई और सौंफ के चटाकेदार फ्लेवर में तैयार पनीर।"
    },
    {
        id: "p4_06",
        nameEn: "Paneer Lababdar",
        nameHi: "पनीर लवाबदार",
        category: "main-paneer",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Rich chunky tomato-onion gravy blended with grated paneer, fresh cream, and butter.",
        descHi: "कद्दूकस पनीर और मक्खन युक्त गाढ़ी क्रीमी टमाटर-प्याज ग्रेवी।"
    },
    {
        id: "p4_07",
        nameEn: "Methi Matar Malai",
        nameHi: "मैथी मटर मलाई",
        category: "main-paneer",
        isVeg: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Sweet tender green peas and fresh fenugreek leaves cooked in a mildly spiced white cream gravy.",
        descHi: "ताजी मैथी, मीठे हरे मटर और मलाई की मनमोहक शाही ग्रेवी।"
    },
    {
        id: "p4_08",
        nameEn: "Tawa Paneer",
        nameHi: "तवा पनीर",
        category: "main-paneer",
        isVeg: true,
        isSpicy: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Crisp cottage cheese tossed on an open tawa with crushed whole spices and crunchy capsicum.",
        descHi: "तवे पर भुने मसालों, शिमला मिर्च और टमाटर के साथ तैयार मसालेदार पनीर।"
    },
    {
        id: "p4_09",
        nameEn: "Matar Paneer",
        nameHi: "मटर पनीर",
        category: "main-paneer",
        isVeg: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Timeless North Indian favourite with green peas and paneer in a spiced tomato-onion curry.",
        descHi: "पारंपरिक उत्तर भारतीय स्वाद में हरे मटर और ताजे पनीर की रसीली सब्जी।"
    },
    {
        id: "p4_10",
        nameEn: "Paneer Bhurji",
        nameHi: "पनीर भुर्जी",
        category: "main-paneer",
        isVeg: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Crumbled fresh cottage cheese sautéed with finely chopped onions, tomatoes, and coriander.",
        descHi: "बारीक प्याज, टमाटर, हरी मिर्च और धनिए के साथ भुनी हुई स्वादिष्ट पनीर भुर्जी।"
    },
    {
        id: "p4_11",
        nameEn: "Paneer Do Pyaza",
        nameHi: "पनीर दो प्याजा",
        category: "main-paneer",
        isVeg: true,
        variants: [{ name: "Half", price: 190 }, { name: "Full", price: 280 }],
        descEn: "Paneer cooked with twice the onions — caramelized puree and crunchy sautéed onion squares.",
        descHi: "प्याज के दोहरे स्वाद और कुरकुरे प्याज के टुकड़ों के साथ पकाया गया पनीर।"
    },
    {
        id: "p4_12",
        nameEn: "Kadhai Paneer",
        nameHi: "कढ़ाई पनीर",
        category: "main-paneer",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 190 }, { name: "Full", price: 280 }],
        descEn: "Succulent paneer with capsicum and onions in freshly pounded coriander-chili kadhai masala.",
        descHi: "साबुत कुटे मसालों, शिमला मिर्च और प्याज के साथ लोहे की कढ़ाई में तैयार।"
    },
    {
        id: "p4_13",
        nameEn: "Paneer Korma",
        nameHi: "पनीर कोरमा",
        category: "main-paneer",
        isVeg: true,
        variants: [{ name: "Half", price: 190 }, { name: "Full", price: 280 }],
        descEn: "Rich Mughlai korma gravy made with yogurt, ground almonds, melon seeds, and fragrant spices.",
        descHi: "दही, बादाम और शाही मसालों की भीनी-भीनी खुशबूदार कोरमा ग्रेवी।"
    },
    {
        id: "p4_14",
        nameEn: "Paneer Kolhapuri",
        nameHi: "पनीर कोल्हापुरी",
        category: "main-paneer",
        isVeg: true,
        isSpicy: true,
        variants: [{ name: "Half", price: 190 }, { name: "Full", price: 280 }],
        descEn: "Spicy, bold Maharashtrian curry made with roasted coconut and fiery red Kolhapuri chilies.",
        descHi: "तीखे मसालों और भुने नारियल के मिश्रण से बना तीखा कोल्हापुरी पनीर।"
    },
    {
        id: "p4_15",
        nameEn: "Paneer Butter Masala",
        nameHi: "पनीर बटर मसाला",
        category: "main-paneer",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 200 }, { name: "Full", price: 300 }],
        descEn: "Velvety, buttery tomato makhani sauce infused with kasuri methi and tender paneer.",
        descHi: "मक्खन और मखमली मखनी ग्रेवी में लिपटा सबका पसंदीदा पनीर बटर मसाला।"
    },
    {
        id: "p4_16",
        nameEn: "Paneer Tikka Masala",
        nameHi: "पनीर टिक्का मसाला",
        category: "main-paneer",
        isVeg: true,
        isChefSpecial: true,
        variants: [{ name: "Half", price: 200 }, { name: "Full", price: 300 }],
        descEn: "Smoky tandoori charcoal-roasted paneer tikka tossed in spicy, flavorful tikka gravy.",
        descHi: "तंदूर में सिका हुआ स्मोकी पनीर टिक्का, मसालेदार गाढ़ी ग्रेवी के साथ।"
    },
    {
        id: "p4_17",
        nameEn: "Handi Paneer",
        nameHi: "हाण्डी पनीर",
        category: "main-paneer",
        isVeg: true,
        isChefSpecial: true,
        variants: [{ name: "Half", price: 200 }, { name: "Full", price: 300 }],
        descEn: "Traditional earthenware pot preparation slow-cooked with Food Junction special aromatics.",
        descHi: "मिट्टी की हांडी में धीमी आंच पर पकाया गया खास स्वादिष्ट पनीर।"
    },

    // ==========================================
    // PAGE 5: MAIN COURSE (वेज ग्रेवी व सब्जियां)
    // ==========================================
    {
        id: "p5_01",
        nameEn: "Banarasi Dum Aloo",
        nameHi: "बनारसी दम आलू",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 250 }],
        descEn: "Crisp baby potatoes cooked in a traditional fragrant Banarasi style tomato-curd gravy.",
        descHi: "पारंपरिक बनारसी अंदाज में भुने आलू और सुगंधित रसीली ग्रेवी।"
    },
    {
        id: "p5_02",
        nameEn: "Kashmiri Dum Aloo",
        nameHi: "कश्मीरी दम आलू",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 170 }, { name: "Full", price: 260 }],
        descEn: "Authentic slow-dum cooked potatoes infused with fennel seeds, dry ginger and Kashmiri mirch.",
        descHi: "सौंफ, सोंठ और कश्मीरी लाल मिर्च से सजी स्वादिष्ट दम आलू ग्रेवी।"
    },
    {
        id: "p5_03",
        nameEn: "Veg Kofta",
        nameHi: "वेज कोफ्ता",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Minced mixed vegetable fried dumplings served in a spiced aromatic onion-tomato curry.",
        descHi: "कुरकुरे मिक्स वेज कोफ्ते, स्वादिष्ट तीखी व सुगंधित ग्रेवी में।"
    },
    {
        id: "p5_04",
        nameEn: "Malai Kofta",
        nameHi: "मलाई कोफ्ता",
        category: "main-veg",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 200 }, { name: "Full", price: 300 }],
        descEn: "Melt-in-mouth cottage cheese and mawa koftas swimming in a rich, sweet cashew-cream gravy.",
        descHi: "मुंह में घुल जाने वाले पनीर-मावा कोफ्ते, मखमली काजू-मलाई ग्रेवी में।"
    },
    {
        id: "p5_05",
        nameEn: "Matar Mushroom",
        nameHi: "मटर मशरूम",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Tender button mushrooms and fresh sweet peas cooked in a robust spiced masala gravy.",
        descHi: "ताजा बटन मशरूम और हरे मटर की मसालेदार उत्तर भारतीय ग्रेवी।"
    },
    {
        id: "p5_06",
        nameEn: "Masala Mushroom",
        nameHi: "मसाला मशरूम",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 160 }, { name: "Full", price: 260 }],
        descEn: "Sliced mushrooms cooked with cumin, onions, garlic and traditional brown onion gravy.",
        descHi: "बारीक कटे प्याज, लहसुन और खड़े मसालों के साथ भुना हुआ मशरूम मसाला।"
    },
    {
        id: "p5_07",
        nameEn: "Mushroom Do Pyaza",
        nameHi: "मशरूम दो प्याजा",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Juicy mushrooms simmered with pearl onions and fragrant garam masala.",
        descHi: "कुरकुरे प्याज के टुकड़ों और रसीले मशरूम की लाजवाब जुगलबंदी।"
    },
    {
        id: "p5_08",
        nameEn: "Egg Curry (2 Pcs)",
        nameHi: "एग करी (दो पीस)",
        category: "main-veg",
        isVeg: false,
        isEgg: true,
        price: 150,
        descEn: "2 boiled golden fried eggs simmered in a homestyle spiced onion-tomato curry.",
        descHi: "2 उबले और सुनहरे तले अंडे, घर जैसी खुशबूदार तीखी ग्रेवी में।"
    },
    {
        id: "p5_09",
        nameEn: "Handi Egg Curry (4 Pcs)",
        nameHi: "हाण्डी एग करी (4 पीस)",
        category: "main-veg",
        isVeg: false,
        isEgg: true,
        isChefSpecial: true,
        price: 260,
        descEn: "4 eggs slow-cooked in traditional clay handi with rich aromatic gravy and spices.",
        descHi: "4 अंडे मिट्टी की हांडी में विशेष मसालों के साथ धीमी आंच पर पकाए गए।"
    },
    {
        id: "p5_10",
        nameEn: "Jeera Aloo",
        nameHi: "जीरा आलू",
        category: "main-veg",
        isVeg: true,
        price: 150,
        descEn: "Crisp potato cubes tempered with roasted cumin seeds, turmeric, green chili and fresh cilantro.",
        descHi: "भुने हुए जीरे, हरी मिर्च और हरे धनिए के तड़के वाले स्वादिष्ट सूखे आलू।"
    },
    {
        id: "p5_11",
        nameEn: "Aloo Gobhi Matar",
        nameHi: "आलू गोभी मटर",
        category: "main-veg",
        isVeg: true,
        price: 150,
        descEn: "Homestyle stir-fried cauliflower florets, diced potatoes and green peas in Indian spices.",
        descHi: "गोभी, आलू और मटर की पारंपरिक घर जैसी मसालेदार सूखी सब्जी।"
    },
    {
        id: "p5_12",
        nameEn: "Mix Veg",
        nameHi: "मिक्स वेज",
        category: "main-veg",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 140 }, { name: "Full", price: 230 }],
        descEn: "Medley of seasonal fresh garden vegetables tossed in balanced, spiced tomato gravy.",
        descHi: "गाजर, बीन्स, मटर, फूलगोभी व पनीर का स्वादिष्ट और पौष्टिक मिश्रण।"
    },
    {
        id: "p5_13",
        nameEn: "Veg Matar Masala",
        nameHi: "वेज मटर मसाला",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 270 }],
        descEn: "Green peas with diced vegetables simmered in a medium-spiced Indian curry.",
        descHi: "हरे मटर और मौसमी सब्जियों का तीखा रसीला मसाला सालन।"
    },
    {
        id: "p5_14",
        nameEn: "Pindi Chhole",
        nameHi: "पिण्डी छोले",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 250 }],
        descEn: "Authentic dark Punjabi chickpeas cooked with dry roasted spices, pomegranate seeds, and ginger.",
        descHi: "अमृतसरी रावलपिंडी स्टाइल काले छोले, अनारदाने व अदरक के लच्छों के साथ।"
    },
    {
        id: "p5_15",
        nameEn: "Chana Masala",
        nameHi: "चना मसाला",
        category: "main-veg",
        isVeg: true,
        variants: [{ name: "Half", price: 130 }, { name: "Full", price: 220 }],
        descEn: "Tender white chickpeas cooked in a tangy tomato, onion and coriander gravy.",
        descHi: "चटपटे काबुली चने, टमाटर और प्याज की मसालेदार तरी में।"
    },

    // ==========================================
    // PAGE 6: CHAAP SPECIALS
    // ==========================================
    // Gravy
    {
        id: "p6_01",
        nameEn: "Soya Masala Chaap",
        nameHi: "सोया मसाला चाप",
        category: "chaap-gravy",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 160 }, { name: "Full", price: 260 }],
        descEn: "Tender soya chaap chunks cooked in a thick spicy onion-tomato masala gravy.",
        descHi: "नर्म रसदार सोया चाप के टुकड़े, गाढ़ी मसालेदार प्याज-टमाटर ग्रेवी में।"
    },
    {
        id: "p6_02",
        nameEn: "Soya Malai Chaap",
        nameHi: "सोया मलाई चाप",
        category: "chaap-gravy",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Soya chaap prepared in rich cream, cashew paste, mild cheese and green cardamom sauce.",
        descHi: "काजू, क्रीम और मक्खन की मीठी-नमकीन मखमली ग्रेवी में तैयार मलाई चाप।"
    },
    {
        id: "p6_03",
        nameEn: "Soya Kali Mirch Chaap",
        nameHi: "सोया काली मिर्च चाप",
        category: "chaap-gravy",
        isVeg: true,
        isSpicy: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Tender soya chaap simmered in a creamy yogurt gravy spiked with crushed black pepper.",
        descHi: "ताजी कुटी काली मिर्च और दही-मलाई के अनोखे फ्लेवर वाली चाप ग्रेवी।"
    },
    {
        id: "p6_04",
        nameEn: "Soya Afghani Chaap",
        nameHi: "सोया अफगानी चाप",
        category: "chaap-gravy",
        isVeg: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 270 }],
        descEn: "Rich Afghan style soya chaap simmered with cashew paste, butter and mild spices.",
        descHi: "अफगानी मसालों और मलाईदार ग्रेवी में धीमी आंच पर पकाई गई चाप।"
    },
    {
        id: "p6_05",
        nameEn: "Soya Kadhai Chaap",
        nameHi: "सोया कढ़ाई चाप",
        category: "chaap-gravy",
        isVeg: true,
        isSpicy: true,
        variants: [{ name: "Half", price: 190 }, { name: "Full", price: 280 }],
        descEn: "Soya chaap tossed with crunchy capsicum, onions and freshly roasted kadhai masala.",
        descHi: "लोहे की कढ़ाई में भुनी शिमला मिर्च, प्याज और खड़े मसालों वाली चाप।"
    },
    // Rolls
    {
        id: "p6_06",
        nameEn: "Achari Chaap Roll",
        nameHi: "अचारी चाप रोल",
        category: "chaap-snacks",
        isVeg: true,
        price: 30,
        descEn: "Crisp flaky wrap stuffed with tangy pickled soya chaap and mint sauce.",
        descHi: "अचारी मसालेदार चाप, लच्छा प्याज और पुदीना चटनी के साथ कुरकुरा रोल।"
    },
    {
        id: "p6_07",
        nameEn: "Tandoori Chaap Roll",
        nameHi: "तन्दूरी चाप रोल",
        category: "chaap-snacks",
        isVeg: true,
        price: 90,
        descEn: "Smoky tandoor roasted soya chaap wrapped in soft rumali with spicy onions.",
        descHi: "तंदूर में सिका हुआ धुआंदार सोया चाप, रुमाली रोटी में लिपटा।"
    },
    {
        id: "p6_08",
        nameEn: "Lehsuni Chaap Roll",
        nameHi: "लहसुनी चाप रोल",
        category: "chaap-snacks",
        isVeg: true,
        price: 90,
        descEn: "Roasted garlic infused soya chaap rolled with crisp salad and green chutney.",
        descHi: "भुने लहसुन और खास मसालों का अनोखा स्वाद लिए गरमा-गरम चाप रोल।"
    },
    {
        id: "p6_09",
        nameEn: "Punjabi Chaap Roll",
        nameHi: "पंजाबी चाप रोल",
        category: "chaap-snacks",
        isVeg: true,
        isBestseller: true,
        price: 100,
        descEn: "Classic North Indian spicy chaap with chopped onions and masala sauces in a wrap.",
        descHi: "तीखे पंजाबी मसालों में लिपटी चाप का मसालेदार रोल।"
    },
    {
        id: "p6_10",
        nameEn: "Malai Chaap Roll",
        nameHi: "मलाई चाप रोल",
        category: "chaap-snacks",
        isVeg: true,
        price: 100,
        descEn: "Luscious creamy malai chaap wrapped with mild herbs and signature garlic dip.",
        descHi: "मखमली मलाई चाप, क्रीम और हल्के मसालों से भरा मुलायम रोल।"
    },
    {
        id: "p6_11",
        nameEn: "Afghani Chaap Roll",
        nameHi: "अफगानी चाप रोल",
        category: "chaap-snacks",
        isVeg: true,
        isChefSpecial: true,
        price: 110,
        descEn: "Melt-in-mouth Afghani marinated chaap rolled with fresh salad and cream.",
        descHi: "अफगानी मसालों और काजू-क्रीम से सजी रसीली चाप का खास रोल।"
    },

    // ==========================================
    // PAGE 7: CHINESE (चाईनीज)
    // ==========================================
    {
        id: "p7_01",
        nameEn: "Veg Noodles",
        nameHi: "वेज नूडल्स",
        category: "chinese",
        isVeg: true,
        price: 100,
        descEn: "Wok-tossed noodles with shredded cabbage, carrots, bell peppers, and soy sauce.",
        descHi: "ताजी सब्जियों और सोया सॉस के साथ तेज आंच पर भुने वेज नूडल्स।"
    },
    {
        id: "p7_02",
        nameEn: "Singapuri Noodles",
        nameHi: "सिंगापुरी नूडल्स",
        category: "chinese",
        isVeg: true,
        price: 130,
        descEn: "Mild curry flavoured noodles stir-fried with capsicum, paneer and vegetables.",
        descHi: "सिंगापुरी करी फ्लेवर और सब्जियों के साथ तैयार स्वादिष्ट नूडल्स।"
    },
    {
        id: "p7_03",
        nameEn: "Desi Noodles",
        nameHi: "देशी नूडल्स",
        category: "chinese",
        isVeg: true,
        isSpicy: true,
        price: 130,
        descEn: "Indian street-style spicy chatpata chowmein with green chilies, onions and house masala.",
        descHi: "चटपटा देसी स्ट्रीट स्टाइल चाउमीन, हरी मिर्च और देसी मसालों के तड़के के साथ।"
    },
    {
        id: "p7_04",
        nameEn: "Paneer Garlic Noodles",
        nameHi: "पनीर गार्लिक नूडल्स",
        category: "chinese",
        isVeg: true,
        isBestseller: true,
        price: 150,
        descEn: "Crisp cottage cheese cubes and golden burnt garlic tossed with thin hakka noodles.",
        descHi: "भुने हुए लहसुन और नर्म पनीर के क्यूब्स से भरपूर लजीज नूडल्स।"
    },
    {
        id: "p7_05",
        nameEn: "Schezwan Noodles",
        nameHi: "शहज़वान नूडल्स",
        category: "chinese",
        isVeg: true,
        isSpicy: true,
        price: 150,
        descEn: "Fiery spicy red noodles tossed with authentic homemade Schezwan sauce and vegetables.",
        descHi: "तीखी शेजवान सॉस और कुरकुरी सब्जियों से बने मसालेदार नूडल्स।"
    },
    {
        id: "p7_06",
        nameEn: "Manchurian Dry",
        nameHi: "मंचूरियन ड्राई",
        category: "chinese",
        isVeg: true,
        isBestseller: true,
        price: 150,
        descEn: "Golden vegetable dumplings tossed dry with ginger, garlic, green chilies, and scallions.",
        descHi: "लहसुन, अदरक और हरी मिर्च की चटपटी सूखी सॉस में लिपटे वेज मंचूरियन बॉल्स।"
    },
    {
        id: "p7_07",
        nameEn: "Hakka Noodles",
        nameHi: "हक्का नूडल्स",
        category: "chinese",
        isVeg: true,
        price: 150,
        descEn: "Authentic Chinese style thin noodles wok-tossed with crunch greens and sesame.",
        descHi: "हल्के मसालों और करारी सब्जियों के साथ बना पारंपरिक हक्का नूडल्स।"
    },
    {
        id: "p7_08",
        nameEn: "Manchurian Gravy",
        nameHi: "मंचूरियन ग्रेवी",
        category: "chinese",
        isVeg: true,
        price: 180,
        descEn: "Vegetable dumplings immersed in rich, savory dark soy and garlic Indo-Chinese gravy.",
        descHi: "सोया सॉस और लहसुन की गाढ़ी रसीली ग्रेवी में डूबे वेज मंचूरियन बॉल्स।"
    },
    {
        id: "p7_09",
        nameEn: "Crunchy Paneer Maharaja",
        nameHi: "क्रंची पनीर महाराजा",
        category: "chinese",
        isVeg: true,
        isChefSpecial: true,
        price: 200,
        descEn: "Large cottage cheese blocks coated in an ultra-crispy royal crust with spicy dips.",
        descHi: "कुरकुरी क्रिस्पी कोटिंग में लिपटा शाही पनीर स्टार्टर, खास डिप्स के साथ।"
    },
    {
        id: "p7_10",
        nameEn: "Chilli Sutli Bomb",
        nameHi: "चिल्ली सूतली बम",
        category: "chinese",
        isVeg: true,
        isSpicy: true,
        isChefSpecial: true,
        price: 220,
        descEn: "Chef's explosive spicy signature potato, cheese and herb roll with a crunchy exterior.",
        descHi: "शेफ का सिग्नेचर धमाकेदार स्नैक — चीज, आलू और तीखे मसालों का क्रंची रोल।"
    },
    {
        id: "p7_11",
        nameEn: "Veg Lollipop",
        nameHi: "वेज लॉलीपॉप",
        category: "chinese",
        isVeg: true,
        price: 250,
        descEn: "Crisp seasoned spiced vegetable balls served on wooden skewers with fiery red chutney.",
        descHi: "सब्जियों और मसालों के कुरकुरे लॉलीपॉप, तीखी लाल डिप के साथ।"
    },
    {
        id: "p7_12",
        nameEn: "Mushroom Cheese Kurkura",
        nameHi: "मशरूम चीज कुरकुरा",
        category: "chinese",
        isVeg: true,
        price: 250,
        descEn: "Juicy mushrooms filled with melted mozzarella cheese, coated in crunchy batter.",
        descHi: "चीज से भरे बटन मशरूम, कुरकुरे क्रंची आवरण में तले हुए।"
    },
    {
        id: "p7_13",
        nameEn: "Mushroom Duplex",
        nameHi: "मशरूम डुप्लैक्स",
        category: "chinese",
        isVeg: true,
        price: 250,
        descEn: "Twin mushroom caps stuffed with spiced cheese & greens, crumb-fried till golden.",
        descHi: "चीज और जड़ी-बूटियों से भरे दोहरे मशरूम, सुनहरे तले हुए।"
    },
    {
        id: "p7_14",
        nameEn: "F.J. Special Mushroom Cheese Kurkura",
        nameHi: "F.J. स्पेशल मशरूम चीज कुरकुरा",
        category: "chinese",
        isVeg: true,
        isChefSpecial: true,
        isBestseller: true,
        price: 280,
        descEn: "Food Junction's crowned signature mushroom snack overflowing with gooey cheese and magic spice mix.",
        descHi: "फूड जंक्शन का विशेष मशहूर स्टार्टर — चीज ब्लास्ट और सीक्रेट मसालों से लबरेज।"
    },

    // ==========================================
    // PAGE 8: DAAL, BREAD & SALAD
    // ==========================================
    // Daal
    {
        id: "p8_01",
        nameEn: "Dal Tadka",
        nameHi: "दाल तड़का",
        category: "daal",
        isVeg: true,
        variants: [{ name: "Half", price: 80 }, { name: "Full", price: 130 }],
        descEn: "Golden yellow toor dal tempered with desi ghee, cumin seeds, garlic, onions, and dried red chilies.",
        descHi: "देसी घी, हींग, जीरा और लहसुन के करारे तड़के वाली पीली अरहर दाल।"
    },
    {
        id: "p8_02",
        nameEn: "Dal Fry",
        nameHi: "दाल फ्राई",
        category: "daal",
        isVeg: true,
        variants: [{ name: "Half", price: 90 }, { name: "Full", price: 150 }],
        descEn: "Slow-simmered lentils pan-fried with chopped ripe tomatoes, onions, ginger, and garam masala.",
        descHi: "टमाटर, प्याज, अदरक और खड़े मसालों के साथ भुनी हुई रसीली दाल।"
    },
    {
        id: "p8_03",
        nameEn: "Hyderabadi Dal",
        nameHi: "हैदराबादी दाल",
        category: "daal",
        isVeg: true,
        variants: [{ name: "Half", price: 120 }, { name: "Full", price: 200 }],
        descEn: "Tangy Hyderabadi khatti meethi lentil preparation tempered with mustard seeds and curry leaves.",
        descHi: "राई, कढ़ी पत्ता और खट्टे-मीठे नवाबी स्वाद वाली हैदराबादी दाल।"
    },
    {
        id: "p8_04",
        nameEn: "Dal Bukhara",
        nameHi: "दाल बुखारा",
        category: "daal",
        isVeg: true,
        variants: [{ name: "Half", price: 120 }, { name: "Full", price: 200 }],
        descEn: "Whole black urad dal simmered overnight on low charcoal embers with pure butter and tomatoes.",
        descHi: "रात भर धीमी आंच पर मक्खन और टमाटर के साथ पकी शाही काली दाल।"
    },
    {
        id: "p8_05",
        nameEn: "Dal Makhani",
        nameHi: "दाल मखनी",
        category: "daal",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 140 }, { name: "Full", price: 220 }],
        descEn: "Food Junction's signature rich black lentils cooked with butter, fresh cream, and fenugreek.",
        descHi: "फूड जंक्शन की खास दाल मखनी — मक्खन, क्रीम और कस्तूरी मेथी से सजी लाजवाब।"
    },
    {
        id: "p8_06",
        nameEn: "Dal Handi",
        nameHi: "दाल हाण्डी",
        category: "daal",
        isVeg: true,
        isChefSpecial: true,
        variants: [{ name: "Half", price: 160 }, { name: "Full", price: 250 }],
        descEn: "Earthen clay-pot dal cooked slow and finished with smoky ghee and whole spices.",
        descHi: "मिट्टी की हांडी में देसी घी के धुएं से तैयार सौंधी खुशबूदार दाल।"
    },
    // Sandwiches
    {
        id: "p8_07",
        nameEn: "Veg Sandwich",
        nameHi: "वेज सेण्डविच",
        category: "burgers-bread",
        isVeg: true,
        price: 100,
        descEn: "Fresh cucumber, juicy tomatoes, onions and green mint chutney grilled in crisp bread.",
        descHi: "खीरा, टमाटर, प्याज और पुदीना चटनी से बना ग्रिल्ड वेज सैंडविच।"
    },
    {
        id: "p8_08",
        nameEn: "Rainbow Sandwich",
        nameHi: "रेनवो सेण्डविच",
        category: "burgers-bread",
        isVeg: true,
        price: 150,
        descEn: "Colorful multi-layer sandwich loaded with beetroot, mint, cheese and corn fillings.",
        descHi: "रंग-बिरंगी परतों में चीज, चुकंदर, कॉर्न और पुदीने का अनोखा स्वाद।"
    },
    {
        id: "p8_09",
        nameEn: "Mumbai Sandwich",
        nameHi: "मुम्बई सेण्डविच",
        category: "burgers-bread",
        isVeg: true,
        isBestseller: true,
        price: 150,
        descEn: "Iconic Mumbai street style toast sandwich with spiced mashed potato, cheese, veggies and sev.",
        descHi: "प्रसिद्ध बॉम्बे मसाला टोस्ट — चटपटे आलू, चीज, सब्जियां और कुरकुरी सेव।"
    },
    // Salad
    {
        id: "p8_10",
        nameEn: "Green Salad",
        nameHi: "ग्रीन सलाद",
        category: "raita-salad",
        isVeg: true,
        price: 80,
        descEn: "Fresh crisp garden salad with sliced cucumber, carrots, tomatoes, onions, green chili and lemon.",
        descHi: "ताजा खीरा, गाजर, टमाटर, प्याज, हरी मिर्च और नींबू का स्वस्थ सलाद।"
    },

    // ==========================================
    // PAGE 9: RAITA & MOMOS
    // ==========================================
    // Raita
    {
        id: "p9_01",
        nameEn: "Boondi Raita",
        nameHi: "बूंदी रायता",
        category: "raita-salad",
        isVeg: true,
        price: 80,
        descEn: "Chilled whipped yogurt with crispy chickpea flour boondi, black salt, and roasted cumin.",
        descHi: "ठंडे गाढ़े दही में कुरकुरी बूंदी, भुना जीरा और काला नमक।"
    },
    {
        id: "p9_02",
        nameEn: "Mix Veg Raita",
        nameHi: "मिक्स वेज रायता",
        category: "raita-salad",
        isVeg: true,
        price: 100,
        descEn: "Creamy beaten yogurt with finely chopped onions, cucumbers and juicy tomatoes.",
        descHi: "बारीक कटे प्याज, खीरा और टमाटर से सजा ठंडा ताज़ा रायता।"
    },
    {
        id: "p9_03",
        nameEn: "Mint Raita",
        nameHi: "मिन्ट रायता",
        category: "raita-salad",
        isVeg: true,
        price: 100,
        descEn: "Cooling yogurt dip blended with fresh garden mint leaves and rock salt.",
        descHi: "ताजे पुदीने की खुशबू और ठंडक से भरा पाचक रायता।"
    },
    {
        id: "p9_04",
        nameEn: "Aloo Pudina Raita",
        nameHi: "आलू पुदीना रायता",
        category: "raita-salad",
        isVeg: true,
        price: 100,
        descEn: "Boiled spiced potato cubes folded in refreshing mint-infused creamy yogurt.",
        descHi: "उबले आलू, पुदीना और चाट मसाले का स्वादिष्ट ठंडा संगम।"
    },
    {
        id: "p9_05",
        nameEn: "Fruit Raita",
        nameHi: "फ्रूट रायता",
        category: "raita-salad",
        isVeg: true,
        price: 120,
        descEn: "Sweetened rich yogurt loaded with fresh seasonal fruits and pomegranate pearls.",
        descHi: "ताजे मौसमी फलों और अनार के दानों से भरपूर मीठा गाढ़ा रायता।"
    },
    {
        id: "p9_06",
        nameEn: "Pineapple Raita",
        nameHi: "पाइन एप्पल रायता",
        category: "raita-salad",
        isVeg: true,
        price: 120,
        descEn: "Sweet and tangy pineapple tidbits folded in silky sweet yogurt with a dash of cardamom.",
        descHi: "खट्टे-मीठे रसीले अनन्नास के टुकड़ों से सजा मखमली रायता।"
    },
    // Momos
    {
        id: "p9_07",
        nameEn: "Steam Momos",
        nameHi: "स्टीम मोमोस",
        category: "momos",
        isVeg: true,
        price: 100,
        descEn: "Tender steamed dumplings stuffed with minced vegetables, served with spicy red chutney.",
        descHi: "भाप में पके हुए नर्म मोमोज, तीखी लहसुनी लाल चटनी और मेयोनीज के साथ।"
    },
    {
        id: "p9_08",
        nameEn: "Fried Momos",
        nameHi: "फ्राइज मोमोस",
        category: "momos",
        isVeg: true,
        price: 110,
        descEn: "Crisp golden deep-fried vegetable momos with a crunchy exterior.",
        descHi: "सुनहरे कुरकुरे तले हुए वेज मोमोज।"
    },
    {
        id: "p9_09",
        nameEn: "Kurkure Momos",
        nameHi: "कुरकुरे मोमोस",
        category: "momos",
        isVeg: true,
        isBestseller: true,
        price: 120,
        descEn: "Coated in a crunchy spiced cornflake batter and fried till ultra-crisp.",
        descHi: "मसालेदार कुरकुरी कोटिंग में तले हुए सुपर क्रिस्पी मोमोज।"
    },
    {
        id: "p9_10",
        nameEn: "Tandoori Momos",
        nameHi: "तन्दूरी मोमोस",
        category: "momos",
        isVeg: true,
        isBestseller: true,
        price: 150,
        descEn: "Marinated in spicy tandoori yogurt sauce and charred in the clay oven.",
        descHi: "तंदूर में भुने हुए स्मोकी और चटपटे तंदूरी मोमोज।"
    },
    {
        id: "p9_11",
        nameEn: "Cheese Blast Momos",
        nameHi: "चीज ब्लास्ट मोमोस",
        category: "momos",
        isVeg: true,
        isChefSpecial: true,
        price: 170,
        descEn: "Dumplings stuffed with molten mozzarella cheese that erupts with flavor in every bite.",
        descHi: "पिघली हुई चीज से भरे मोमोज, जो हर निवाले में स्वाद का धमाका करते हैं।"
    },
    {
        id: "p9_12",
        nameEn: "Malai Momos",
        nameHi: "मलाई मोमोस",
        category: "momos",
        isVeg: true,
        price: 170,
        descEn: "Tossed in velvety fresh cream, melted butter, oregano, and mild herbs.",
        descHi: "गाढ़ी मलाई, मक्खन और जड़ी-बूटियों में डूबे हुए नर्म मोमोज।"
    },
    {
        id: "p9_13",
        nameEn: "Afghani Momos",
        nameHi: "अफगानी मोमोस",
        category: "momos",
        isVeg: true,
        price: 170,
        descEn: "Coated in rich Afghan cashew and cream marinade, gently grilled to perfection.",
        descHi: "अफगानी मसालों और काजू-क्रीम के शाही स्वाद में लिपटे मोमोज।"
    },

    // ==========================================
    // PAGE 10: CHILLI POTATO & RICE
    // ==========================================
    // Chilli Potato & Starters
    {
        id: "p10_01",
        nameEn: "Chilli Potato",
        nameHi: "चिल्ली पटैटो",
        category: "chilli-potato",
        isVeg: true,
        price: 120,
        descEn: "Crispy fried potato finger strips tossed in spicy garlic chili sauce and sesame.",
        descHi: "लहसुन, हरी मिर्च और तिल के साथ तीखी सॉस में लिपटे कुरकुरे आलू।"
    },
    {
        id: "p10_02",
        nameEn: "Dragon Chilli Potato",
        nameHi: "ड्रेगन चिल्ली पटैटो",
        category: "chilli-potato",
        isVeg: true,
        isSpicy: true,
        price: 130,
        descEn: "Fiery wok-tossed potato batons tossed with bell peppers, hot red chilies and scallions.",
        descHi: "लाल मिर्च और शिमला मिर्च के साथ तेज आंच पर भुने तीखे ड्रैगन पटैटो।"
    },
    {
        id: "p10_03",
        nameEn: "Honey Chilli Potato",
        nameHi: "हनी चिल्ली पटैटो",
        category: "chilli-potato",
        isVeg: true,
        isBestseller: true,
        price: 150,
        descEn: "Sweet & spicy crispy potatoes glazed with pure honey, chili paste and sesame seeds.",
        descHi: "शहद की मिठास और लाल मिर्च के तीखेपन का लाजवाब क्रिस्पी कॉम्बिनेशन।"
    },
    {
        id: "p10_04",
        nameEn: "Chilli Paneer Dry",
        nameHi: "चिल्ली पनीर ड्राई",
        category: "chilli-potato",
        isVeg: true,
        isBestseller: true,
        price: 200,
        descEn: "Crispy batter-coated cottage cheese tossed with crunchy bell peppers, onions and soy.",
        descHi: "शिमला मिर्च, प्याज और डार्क सोया सॉस में भुना हुआ कुरकुरा पनीर।"
    },
    {
        id: "p10_05",
        nameEn: "Chilli Paneer Gravy",
        nameHi: "चिल्ली पनीर ग्रेवी",
        category: "chilli-potato",
        isVeg: true,
        price: 240,
        descEn: "Soft paneer cubes simmered in a thick, glossy garlic chili Indo-Chinese gravy.",
        descHi: "गाढ़ी, लजीज इंडो-चाइनीज सॉस में डूबा हुआ नर्म पनीर।"
    },
    {
        id: "p10_06",
        nameEn: "Chilli Mushroom Snacks",
        nameHi: "चिल्ली मशरूम स्नेक्स",
        category: "chilli-potato",
        isVeg: true,
        price: 240,
        descEn: "Fresh button mushrooms fried crisp and tossed in hot garlic pepper sauce.",
        descHi: "करारे तले मशरूम, लहसुन और काली मिर्च की तीखी सॉस के साथ।"
    },
    // Rice & Biryani
    {
        id: "p10_07",
        nameEn: "Steam Rice",
        nameHi: "स्टीम राइस",
        category: "rice",
        isVeg: true,
        variants: [{ name: "Half", price: 60 }, { name: "Full", price: 100 }],
        descEn: "Fluffy, aromatic long-grain basmati rice steamed to perfection.",
        descHi: "लंबी बासमती चावल के खुशबूदार और खिले-खिले उबले चावल।"
    },
    {
        id: "p10_08",
        nameEn: "Veg Pulao",
        nameHi: "वेज पुलाव",
        category: "rice",
        isVeg: true,
        price: 120,
        descEn: "Fragrant basmati rice gently cooked with fresh seasonal vegetables and whole spices.",
        descHi: "सब्जियों और खड़े मसालों के साथ पकाया गया सुगंधित वेज पुलाव।"
    },
    {
        id: "p10_09",
        nameEn: "Jeera Rice",
        nameHi: "जीरा राइस",
        category: "rice",
        isVeg: true,
        variants: [{ name: "Half", price: 80 }, { name: "Full", price: 140 }],
        descEn: "Steamed basmati rice tempered with golden cumin seeds and desi ghee.",
        descHi: "देसी घी और भुने जीरे के तड़के वाले स्वादिष्ट बासमती चावल।"
    },
    {
        id: "p10_10",
        nameEn: "Matar Paneer Pulao",
        nameHi: "मटर पनीर पुलाव",
        category: "rice",
        isVeg: true,
        price: 150,
        descEn: "Basmati rice cooked with fresh green peas, soft paneer cubes and whole aromatics.",
        descHi: "हरे मटर और नर्म पनीर के टुकड़ों से सजा लजीज पुलाव।"
    },
    {
        id: "p10_11",
        nameEn: "Mix Pulao",
        nameHi: "मिक्स पुलाव",
        category: "rice",
        isVeg: true,
        price: 150,
        descEn: "Chef's special assortment of mixed vegetables, paneer and spices cooked with rice.",
        descHi: "विभिन्न मौसमी सब्जियों और पनीर से तैयार विशेष पुलाव।"
    },
    {
        id: "p10_12",
        nameEn: "Kashmiri Pulao",
        nameHi: "कश्मीरी पुलाव",
        category: "rice",
        isVeg: true,
        price: 150,
        descEn: "Mild sweet saffron basmati rice garnished with fresh fruits, nuts and fried cashews.",
        descHi: "केसर, काजू, किशमिश और ताजे फलों से सजा शाही कश्मीरी पुलाव।"
    },
    {
        id: "p10_13",
        nameEn: "Fried Rice",
        nameHi: "फ्राईड राइस",
        category: "rice",
        isVeg: true,
        variants: [{ name: "Half", price: 120 }, { name: "Full", price: 180 }],
        descEn: "Classic Indo-Chinese wok-tossed basmati rice with finely diced vegetables and soy.",
        descHi: "बारीक कटी सब्जियों और सोया सॉस के साथ तेज आंच पर भुना फ्राइड राइस।"
    },
    {
        id: "p10_14",
        nameEn: "Hyderabadi Biryani",
        nameHi: "हैदराबादी बिरयानी",
        category: "rice",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 250 }],
        descEn: "Dum-cooked fragrant basmati rice layered with spiced vegetables, saffron and fried onions.",
        descHi: "केसरिया बासमती चावल और मसालों की परतों में दम दी गई हैदराबादी बिरयानी।"
    },
    {
        id: "p10_15",
        nameEn: "Handi Biryani",
        nameHi: "हाण्डी बिरयानी",
        category: "rice",
        isVeg: true,
        isChefSpecial: true,
        price: 250,
        descEn: "Sealed clay pot royal biryani cooked slowly to lock in all authentic aromas.",
        descHi: "मिट्टी की हांडी में सील बंद कर पकाई गई खुशबूदार दम बिरयानी।"
    },

    // ==========================================
    // PAGE 11: CHAAP SNACKS & BURGERS
    // ==========================================
    // Chaap Snacks
    {
        id: "p11_01",
        nameEn: "Punjabi Chaap",
        nameHi: "पंजाबी चाप",
        category: "chaap-snacks",
        isVeg: true,
        variants: [{ name: "Half", price: 140 }, { name: "Full", price: 250 }],
        descEn: "Tandoor roasted soya chaap marinated in spicy authentic Punjabi red spices.",
        descHi: "तीखे पंजाबी मसालों में मैरीनेट कर तंदूर में सेकी गई चाप।"
    },
    {
        id: "p11_02",
        nameEn: "Achari Chaap",
        nameHi: "अचारी चाप",
        category: "chaap-snacks",
        isVeg: true,
        variants: [{ name: "Half", price: 140 }, { name: "Full", price: 250 }],
        descEn: "Tangy pickled soya chaap skewered and roasted with mustard and fenugreek seeds.",
        descHi: "चटाकेदार अचारी फ्लेवर में सिकी हुई कुरकुरी तंदूरी चाप।"
    },
    {
        id: "p11_03",
        nameEn: "Masala Chaap",
        nameHi: "मसाला चाप",
        category: "chaap-snacks",
        isVeg: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 270 }],
        descEn: "Tandoored soya chaap tossed in dry roasted spice mix, butter and lemon juice.",
        descHi: "भुने मसालों, मक्खन और नींबू के रस से सनी मसालेदार चाप।"
    },
    {
        id: "p11_04",
        nameEn: "Afghani Chaap",
        nameHi: "अफगानी चाप",
        category: "chaap-snacks",
        isVeg: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 270 }],
        descEn: "Rich Afghan cashew and cream marinated chaap, char-grilled till succulent.",
        descHi: "काजू पेस्ट और क्रीम की कोटिंग में पकाई गई स्वादिष्ट अफगानी चाप।"
    },
    {
        id: "p11_05",
        nameEn: "Malai Chaap",
        nameHi: "मलाई चाप",
        category: "chaap-snacks",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 270 }],
        descEn: "Melt-in-mouth mild chaap coated in thick fresh malai, butter and mild spices.",
        descHi: "मक्खन और गाढ़ी मलाई में डूबी हुई कोमल मलाई चाप।"
    },
    {
        id: "p11_06",
        nameEn: "Lehsuni Chaap",
        nameHi: "लहसुनी चाप",
        category: "chaap-snacks",
        isVeg: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 270 }],
        descEn: "Garlic lovers delight — roasted garlic marinade over juicy soya chaap sticks.",
        descHi: "भुने लहसुन और हरी मिर्च के तीखे तड़के वाली लहसुनी चाप।"
    },
    {
        id: "p11_07",
        nameEn: "Lemon Chaap",
        nameHi: "लेमन चाप",
        category: "chaap-snacks",
        isVeg: true,
        variants: [{ name: "Half", price: 150 }, { name: "Full", price: 270 }],
        descEn: "Zesty tangy soya chaap glazed with freshly squeezed lemon and chaat masala.",
        descHi: "ताजा नींबू और चाट मसाले के खट्टे-तीखे स्वाद वाली लेमन चाप।"
    },
    // Burgers
    {
        id: "p11_08",
        nameEn: "Veg Burger",
        nameHi: "वेज बर्गर",
        category: "burgers-bread",
        isVeg: true,
        price: 60,
        descEn: "Crisp potato patty with lettuce, tomatoes, onions and house mayo in a toasted sesame bun.",
        descHi: "कुरकुरी आलू टिक्की, सलाद और मेयोनीज के साथ मुलायम टोस्टेड बर्गर।"
    },
    {
        id: "p11_09",
        nameEn: "Cheese Burger",
        nameHi: "चीज बर्गर",
        category: "burgers-bread",
        isVeg: true,
        price: 80,
        descEn: "Golden veggie patty topped with a slice of melted cheese and special thousand island spread.",
        descHi: "पिघली हुई चीज स्लाइस और क्रिस्पी पैटी से भरा स्वादिष्ट बर्गर।"
    },
    {
        id: "p11_10",
        nameEn: "Paneer Burger",
        nameHi: "पनीर बर्गर",
        category: "burgers-bread",
        isVeg: true,
        isBestseller: true,
        price: 100,
        descEn: "Grilled spiced cottage cheese slab with fresh crunchy vegetables and mint mayo.",
        descHi: "मसालेदार ग्रिल्ड पनीर स्लैब और ताजी सब्जियों वाला प्रीमियम बर्गर।"
    },
    {
        id: "p11_11",
        nameEn: "Crispy Burger",
        nameHi: "क्रिस्पी बर्गर",
        category: "burgers-bread",
        isVeg: true,
        price: 100,
        descEn: "Extra crunchy crumbed double vegetable patty with spicy chipotle sauce and crisp onions.",
        descHi: "एक्स्ट्रा क्रंची पैटी और तीखी सॉस के साथ क्रिस्पी बर्गर।"
    },

    // ==========================================
    // PAGE 12: TIKKA, ROLLS & BEVERAGES
    // ==========================================
    // Tikka & Rolls
    {
        id: "p12_01",
        nameEn: "Hara Bhara Kabab",
        nameHi: "हारा-भरा कबाब",
        category: "tikka-kabab",
        isVeg: true,
        price: 130,
        descEn: "Crisp pan-fried patties made of fresh spinach, green peas, potatoes and mild spices.",
        descHi: "पालक, मटर और आलू से बने सुनहरे तले हुए सेहतमंद कबाब।"
    },
    {
        id: "p12_02",
        nameEn: "Veg Kabab",
        nameHi: "वेज कबाब",
        category: "tikka-kabab",
        isVeg: true,
        price: 130,
        descEn: "Minced mixed vegetables and lentils skewered and tandoored with herb seasoning.",
        descHi: "सब्जियों और मसालों से तैयार तंदूरी सींक कबाब।"
    },
    {
        id: "p12_03",
        nameEn: "Paneer Veg Roll",
        nameHi: "पनीर वेज रोल",
        category: "tikka-kabab",
        isVeg: true,
        price: 150,
        descEn: "Spiced paneer cubes and crunchy vegetables rolled in a flaky golden paratha.",
        descHi: "मसालेदार पनीर और सब्जियों का लच्छा पराठे में बना रोल।"
    },
    {
        id: "p12_04",
        nameEn: "Paneer Veg Web Roll",
        nameHi: "पनीर वेज वेब रोल",
        category: "tikka-kabab",
        isVeg: true,
        price: 150,
        descEn: "Signature crunchy webbed pastry wrap stuffed with paneer, corn and herbs.",
        descHi: "जालीदार क्रिस्पी क्रस्ट में भरा हुआ पनीर और सब्जियों का रोल।"
    },
    {
        id: "p12_05",
        nameEn: "Dahi Ke Shole",
        nameHi: "दही के शोले",
        category: "tikka-kabab",
        isVeg: true,
        isChefSpecial: true,
        price: 200,
        descEn: "Crispy bread roll casings stuffed with spiced creamy hung curd, bell peppers and herbs.",
        descHi: "हंग कर्ड (गाढ़े दही) और शिमला मिर्च से भरे प्रसिद्ध कुरकुरे शोले।"
    },
    {
        id: "p12_06",
        nameEn: "Paneer Tikka",
        nameHi: "पनीर टिक्का",
        category: "tikka-kabab",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Half", price: 180 }, { name: "Full", price: 280 }],
        descEn: "Charcoal grilled skewered cottage cheese cubes, bell peppers and onions in ajwain marinade.",
        descHi: "तंदूर में सिका हुआ धुआंदार पनीर टिक्का, प्याज और शिमला मिर्च के साथ।"
    },
    {
        id: "p12_07",
        nameEn: "Malai Tikka",
        nameHi: "मलाई टिक्का",
        category: "tikka-kabab",
        isVeg: true,
        variants: [{ name: "Half", price: 190 }, { name: "Full", price: 290 }],
        descEn: "Melt-in-mouth cottage cheese marinated in cream, cashew paste, cheese and white pepper.",
        descHi: "काजू-क्रीम और सफेद मिर्च की मखमली कोटिंग में सिका मलाई टिक्का।"
    },
    // Coffee / Lassi
    {
        id: "p12_08",
        nameEn: "Hot Coffee",
        nameHi: "हॉट कॉफी",
        category: "beverages",
        isVeg: true,
        price: 50,
        descEn: "Freshly brewed frothy hot milk coffee.",
        descHi: "झागदार ताजी गरमा-गरम मिल्क कॉफी।"
    },
    {
        id: "p12_09",
        nameEn: "Cappuccino Coffee",
        nameHi: "केपूचिनो कॉफी",
        category: "beverages",
        isVeg: true,
        price: 60,
        descEn: "Rich espresso coffee topped with thick steamed milk foam and cocoa powder.",
        descHi: "गाढ़े दूध के झाग और कोको पाउडर से सजी कैपुचिनो।"
    },
    {
        id: "p12_10",
        nameEn: "Cold Coffee",
        nameHi: "कोल्ड कॉफी",
        category: "beverages",
        isVeg: true,
        isBestseller: true,
        price: 90,
        descEn: "Chilled blended coffee with milk, cream and chocolate drizzle.",
        descHi: "ठंडी गाढ़ी ब्लेंडेड कॉफी, चॉकलेट सिरप के साथ।"
    },
    {
        id: "p12_11",
        nameEn: "Masala Chhach",
        nameHi: "मसाला छाछ",
        category: "beverages",
        isVeg: true,
        price: 100,
        descEn: "Refreshing spiced buttermilk churned with roasted cumin, rock salt, mint and coriander.",
        descHi: "भुना जीरा, काला नमक और पुदीने से बनी ठंडी पाचक छाछ।"
    },
    {
        id: "p12_12",
        nameEn: "Sweet Lassi",
        nameHi: "स्वीट लस्सी",
        category: "beverages",
        isVeg: true,
        isBestseller: true,
        price: 120,
        descEn: "Traditional thick Punjabi sweet curd lassi topped with fresh malai and cardamom.",
        descHi: "गाढ़े मीठे दही से बनी मलाईदार पंजाबी लस्सी।"
    },
    {
        id: "p12_13",
        nameEn: "Salted Lassi",
        nameHi: "सॉल्टेड लस्सी",
        category: "beverages",
        isVeg: true,
        price: 120,
        descEn: "Thick curd lassi seasoned with black salt and roasted cumin powder.",
        descHi: "काले नमक और भुने जीरे वाली नमकीन गाढ़ी लस्सी।"
    },

    // ==========================================
    // PAGE 13: ROTI & PAPAD
    // ==========================================
    // Roti & Naan
    {
        id: "p13_01",
        nameEn: "Plain Roti",
        nameHi: "सादा रोटी",
        category: "roti",
        isVeg: true,
        price: 10,
        descEn: "Clay oven baked whole wheat tandoori roti.",
        descHi: "तंदूर में सिकी गेहूं की सादा गरम रोटी।"
    },
    {
        id: "p13_02",
        nameEn: "Rumali Roti",
        nameHi: "रुमाली रोटी",
        category: "roti",
        isVeg: true,
        price: 10,
        descEn: "Super thin and soft handkerchief flatbread.",
        descHi: "रुमाल जैसी पतली और बेहद मुलायम रोटी।"
    },
    {
        id: "p13_03",
        nameEn: "Butter Roti",
        nameHi: "बटर रोटी",
        category: "roti",
        isVeg: true,
        price: 15,
        descEn: "Tandoori wheat roti glazed generously with pure butter.",
        descHi: "मक्खन लगी हुई तंदूरी गेहूं की रोटी।"
    },
    {
        id: "p13_04",
        nameEn: "Butter Naan",
        nameHi: "बटर नान",
        category: "roti",
        isVeg: true,
        isBestseller: true,
        price: 30,
        descEn: "Soft leavened refined flour flatbread brushed with butter.",
        descHi: "मुलायम और मक्खन से भरपूर तंदूरी नान।"
    },
    {
        id: "p13_05",
        nameEn: "Garlic Naan",
        nameHi: "गार्लिक नान",
        category: "roti",
        isVeg: true,
        isBestseller: true,
        price: 30,
        descEn: "Naan topped with minced roasted garlic, butter and fresh cilantro.",
        descHi: "भुने लहसुन और ताजे धनिए से सजा खुशबूदार नान।"
    },
    {
        id: "p13_06",
        nameEn: "Lachha Paratha",
        nameHi: "लच्छा पराठा",
        category: "roti",
        isVeg: true,
        price: 40,
        descEn: "Crisp, flaky multi-layered whole wheat tandoori paratha.",
        descHi: "परतदार कुरकुरा तंदूरी लच्छा पराठा।"
    },
    {
        id: "p13_07",
        nameEn: "Afghani Naan",
        nameHi: "अफगानी नान",
        category: "roti",
        isVeg: true,
        price: 40,
        descEn: "Fluffy Afghan style tandoori naan with sesame seeds.",
        descHi: "तिल और खास बनावट वाला फूला हुआ अफगानी नान।"
    },
    {
        id: "p13_08",
        nameEn: "Missi Roti",
        nameHi: "मिस्सी रोटी",
        category: "roti",
        isVeg: true,
        price: 40,
        descEn: "Gram flour (besan) and wheat flatbread with ajwain and spices.",
        descHi: "बेसन और अजवाइन के पारंपरिक स्वाद वाली मिस्सी रोटी।"
    },
    {
        id: "p13_09",
        nameEn: "Onion Missi Roti",
        nameHi: "ऑनियन मिस्सी रोटी",
        category: "roti",
        isVeg: true,
        price: 40,
        descEn: "Missi roti kneaded with finely chopped onions and herbs.",
        descHi: "बारीक प्याज और मसालों से भरी मिस्सी रोटी।"
    },
    {
        id: "p13_10",
        nameEn: "Kabuli Naan",
        nameHi: "काबुली नान",
        category: "roti",
        isVeg: true,
        price: 50,
        descEn: "Mildly sweet naan stuffed with grated dry fruits and nuts.",
        descHi: "मेवों और नारियल के मिश्रण से भरा शाही काबुली नान।"
    },
    {
        id: "p13_11",
        nameEn: "Aloo Paratha",
        nameHi: "आलू पराठा",
        category: "roti",
        isVeg: true,
        price: 70,
        descEn: "Tandoori paratha stuffed with seasoned mashed potatoes.",
        descHi: "चटपटे उबले आलू के भरावन वाला तंदूरी पराठा।"
    },
    {
        id: "p13_12",
        nameEn: "Stuffed Naan",
        nameHi: "स्टफ नान",
        category: "roti",
        isVeg: true,
        price: 70,
        descEn: "Soft naan filled with spiced minced vegetables and potatoes.",
        descHi: "मसालेदार सब्जियों और आलू से भरा तंदूरी नान।"
    },
    {
        id: "p13_13",
        nameEn: "Paneer Paratha",
        nameHi: "पनीर पराठा",
        category: "roti",
        isVeg: true,
        isBestseller: true,
        price: 100,
        descEn: "Crisp tandoori paratha loaded with spiced grated cottage cheese.",
        descHi: "कद्दूकस पनीर और मसालों से भरपूर लजीज पराठा।"
    },
    // Papad
    {
        id: "p13_14",
        nameEn: "Tandoori Plain Papad",
        nameHi: "तन्दूरी प्लेन पापड़",
        category: "raita-salad",
        isVeg: true,
        price: 30,
        descEn: "Clay oven roasted crisp urad dal papad.",
        descHi: "तंदूर में सिका हुआ कुरकुरा उड़द दाल पापड़।"
    },
    {
        id: "p13_15",
        nameEn: "Masala Papad",
        nameHi: "मसाला पापड़",
        category: "raita-salad",
        isVeg: true,
        price: 40,
        descEn: "Roasted papad topped with spicy chopped onions, tomatoes, green chili, and lemon.",
        descHi: "बारीक कटे प्याज, टमाटर, हरी मिर्च और चाट मसाले से सजा पापड़।"
    },
    {
        id: "p13_16",
        nameEn: "Fry Masala Papad",
        nameHi: "फ्राई मसाला पापड़",
        category: "raita-salad",
        isVeg: true,
        price: 50,
        descEn: "Golden deep-fried crunchy papad topped with spicy salad salsa.",
        descHi: "तेल में कुरकुरा तला हुआ मसाला पापड़।"
    },

    // ==========================================
    // PAGE 14: SOUTH INDIAN & COMBOS
    // ==========================================
    {
        id: "p14_01",
        nameEn: "Idli Sambhar",
        nameHi: "इडली सांभर",
        category: "south-indian",
        isVeg: true,
        price: 70,
        descEn: "2 fluffy steamed rice cakes served with hot spicy dal sambhar and coconut chutney.",
        descHi: "2 नर्म इडली, गरमा-गरम सांभर और नारियल चटनी के साथ।"
    },
    {
        id: "p14_02",
        nameEn: "Plain Dosa",
        nameHi: "प्लेन डोसा",
        category: "south-indian",
        isVeg: true,
        price: 80,
        descEn: "Golden thin crispy rice crepe served with piping hot sambhar and chutneys.",
        descHi: "कुरकुरा सुनहरा प्लेन डोसा, सांभर और नारियल चटनी के साथ।"
    },
    {
        id: "p14_03",
        nameEn: "Masala Dosa",
        nameHi: "मसाला डोसा",
        category: "south-indian",
        isVeg: true,
        isBestseller: true,
        price: 100,
        descEn: "Crisp crepe filled with spiced mustard and curry leaf seasoned potato mash.",
        descHi: "चटपटे आलू मसाले से भरा सबका पसंदीदा क्रिस्पी मसाला डोसा।"
    },
    {
        id: "p14_04",
        nameEn: "Chole Bhature",
        nameHi: "छोले भटूरे",
        category: "south-indian",
        isVeg: true,
        isBestseller: true,
        price: 100,
        descEn: "2 fluffy golden bhaturas served with spicy Punjabi chole, pickle and onion salad.",
        descHi: "2 फूले-फूले भटूरे, मसालेदार पंजाबी छोले और प्याज-अचार के साथ।"
    },
    {
        id: "p14_05",
        nameEn: "Masala Idli",
        nameHi: "मसाला इडली",
        category: "south-indian",
        isVeg: true,
        price: 120,
        descEn: "Steamed idli cubes pan-tossed in mustard seeds, curry leaves, onions and podi masala.",
        descHi: "राई, कढ़ी पत्ता और प्याज के तड़के में भुनी हुई मसाला इडली।"
    },
    {
        id: "p14_06",
        nameEn: "Pav Bhaji",
        nameHi: "पाव भाजी",
        category: "south-indian",
        isVeg: true,
        isBestseller: true,
        price: 120,
        descEn: "Spiced mashed mixed vegetable curry with dollops of butter served with 2 toasted pavs.",
        descHi: "मक्खन से लबालब चटपटी भाजी और मक्खन में सिके 2 पाव।"
    },
    {
        id: "p14_07",
        nameEn: "Veg Uttapam",
        nameHi: "वेज उत्तपम्",
        category: "south-indian",
        isVeg: true,
        price: 120,
        descEn: "Thick savory rice pancake topped with fresh tomatoes, onions, capsicum, and green chili.",
        descHi: "टमाटर, प्याज और शिमला मिर्च से सजा मोटा और नर्म उत्तपम।"
    },
    {
        id: "p14_08",
        nameEn: "Paneer Masala Dosa",
        nameHi: "पनीर मसाला डोसा",
        category: "south-indian",
        isVeg: true,
        price: 140,
        descEn: "Crisp dosa filled with potato mash and generously grated fresh cottage cheese.",
        descHi: "आलू मसाले और कद्दूकस पनीर के भरावन वाला क्रिस्पी डोसा।"
    },
    {
        id: "p14_09",
        nameEn: "Paneer Rava Masala Dosa",
        nameHi: "पनीर रवा मसाला डोसा",
        category: "south-indian",
        isVeg: true,
        price: 140,
        descEn: "Crispy semolina net crepe filled with spiced potato masala and grated paneer.",
        descHi: "रवा (सूजी) का जालीदार कुरकुरा डोसा, आलू और पनीर भरावन के साथ।"
    },
    {
        id: "p14_10",
        nameEn: "Mysore Masala Dosa",
        nameHi: "मैसूर मसाला डोसा",
        category: "south-indian",
        isVeg: true,
        isSpicy: true,
        price: 140,
        descEn: "Smudged inside with spicy red garlic chili paste and filled with potato masala.",
        descHi: "तीखी लाल लहसुन चटनी की परत और आलू मसाले वाला मैसूर डोसा।"
    },
    {
        id: "p14_11",
        nameEn: "Paneer Rava Dosa",
        nameHi: "पनीर रवा डोसा",
        category: "south-indian",
        isVeg: true,
        price: 150,
        descEn: "Golden lacy semolina crepe stuffed with rich spiced paneer.",
        descHi: "कुरकुरा रवा डोसा, भरपूर पनीर के साथ।"
    },
    {
        id: "p14_12",
        nameEn: "Butter Paneer Masala Dosa",
        nameHi: "बटर पनीर मसाला डोसा",
        category: "south-indian",
        isVeg: true,
        isChefSpecial: true,
        price: 150,
        descEn: "Roasted crisp in generous butter, packed with rich potato and paneer stuffing.",
        descHi: "ढेर सारे मक्खन में सिका, पनीर और आलू मसाले से भरपूर डोसा।"
    },
    // Combos
    {
        id: "p14_13",
        nameEn: "Dal Chawal Combo",
        nameHi: "दाल चावल",
        category: "combos",
        isVeg: true,
        price: 100,
        descEn: "Comfort bowl of yellow dal tadka served with fragrant steamed rice and pickle.",
        descHi: "घर जैसा पौष्टिक दाल तड़का, बासमती चावल और अचार का कॉम्बो।"
    },
    {
        id: "p14_14",
        nameEn: "Chole Chawal Combo",
        nameHi: "छोले चावल",
        category: "combos",
        isVeg: true,
        isBestseller: true,
        price: 120,
        descEn: "Spiced Punjabi chickpeas curry served with hot basmati rice and sliced onions.",
        descHi: "मसालेदार पंजाबी छोले और खिले-खिले बासमती चावल।"
    },
    {
        id: "p14_15",
        nameEn: "Paneer Chawal Combo",
        nameHi: "पनीर चावल",
        category: "combos",
        isVeg: true,
        price: 130,
        descEn: "Rich paneer gravy served with aromatic basmati rice and salad.",
        descHi: "शाही पनीर ग्रेवी और गरमा-गरम बासमती चावल का स्वादिष्ट कॉम्बो।"
    },

    // ==========================================
    // PAGE 15: THALI & CHINESE COMBOS
    // ==========================================
    {
        id: "p15_01",
        nameEn: "South Indian Thali",
        nameHi: "साउथ इण्डियन थाली",
        category: "thali",
        isVeg: true,
        price: 160,
        descEn: "Complete South Indian platter: Dosa, Uttapam, Idli, piping hot Sambhar & 2 Chutneys.",
        descHi: "सम्पूर्ण दक्षिण भारतीय थाली — डोसा, उत्तपम, इडली, सांभर और चटनियां।"
    },
    {
        id: "p15_02",
        nameEn: "Sada Thali",
        nameHi: "सादा थाली",
        category: "thali",
        isVeg: true,
        price: 179,
        descEn: "Hearty daily meal: Paneer Sabzi, Dal, Steamed Rice, Raita & 4 Tandoori Rotis.",
        descHi: "संतुलित दैनिक भोजन — पनीर सब्जी, दाल, चावल, रायता और 4 तंदूरी रोटी।"
    },
    {
        id: "p15_03",
        nameEn: "F.J. Special Thali",
        nameHi: "F.J. स्पेशल थाली",
        category: "thali",
        isVeg: true,
        isChefSpecial: true,
        isBestseller: true,
        price: 249,
        descEn: "Grand Royal Feast: Paneer Dish, Dal Makhani, Mix Veg, Basmati Rice, Baby Naan, Baby Lachha Naan, Raita, Salad & Papad.",
        descHi: "शाही महाभोज — पनीर, दाल मखनी, मिक्स वेज, बासमती राइस, बेबी नान, बेबी लच्छा नान, रायता, सलाद और पापड़।"
    },
    {
        id: "p15_04",
        nameEn: "Fried Rice + Manchurian Gravy",
        nameHi: "फ्राइड राइस + मंचूरियन ग्रेवी",
        category: "combos",
        isVeg: true,
        isBestseller: true,
        price: 150,
        descEn: "Hot vegetable fried rice paired with rich savory Manchurian gravy.",
        descHi: "गरमा-गरम वेज फ्राइड राइस और स्वादिष्ट वेज मंचूरियन ग्रेवी।"
    },
    {
        id: "p15_05",
        nameEn: "Noodles + Manchurian Gravy",
        nameHi: "नूडल्स + मंचूरियन ग्रेवी",
        category: "combos",
        isVeg: true,
        isBestseller: true,
        price: 150,
        descEn: "Stir-fried noodles paired with piping hot vegetable Manchurian gravy.",
        descHi: "वेज हक्का नूडल्स और स्वादिष्ट वेज मंचूरियन ग्रेवी का पसंदीदा कॉम्बो।"
    },

    // ==========================================
    // PAGE 16: PIZZA & SOUPS
    // ==========================================
    // Pizza
    {
        id: "p16_01",
        nameEn: "Plain Margherita Pizza",
        nameHi: "प्लेन पिज्जा (मगरीठा)",
        category: "pizza",
        isVeg: true,
        variants: [{ name: "Regular", price: 120 }, { name: "Medium", price: 200 }],
        descEn: "Classic mozzarella cheese pizza topped with rich Italian herb tomato sauce and basil.",
        descHi: "क्लासिक मोत्ज़ारेला चीज और इटैलियन हर्ब्स वाला सदाबहार मार्गरिटा पिज्जा।"
    },
    {
        id: "p16_02",
        nameEn: "Onion Tomato Capsicum Pizza",
        nameHi: "ऑनियन टोमेटो केप्सिकम",
        category: "pizza",
        isVeg: true,
        variants: [{ name: "Regular", price: 150 }, { name: "Medium", price: 270 }],
        descEn: "Crunchy trio of diced onions, juicy ripe tomatoes and crisp bell peppers on gooey cheese.",
        descHi: "प्याज, रसीले टमाटर और शिमला मिर्च का कुरकुरा चीज पिज्जा।"
    },
    {
        id: "p16_03",
        nameEn: "Mushroom Pizza",
        nameHi: "मशरूम पिज्जा",
        category: "pizza",
        isVeg: true,
        variants: [{ name: "Regular", price: 150 }, { name: "Medium", price: 270 }],
        descEn: "Loaded with sliced fresh button mushrooms, Italian seasoning and melted mozzarella.",
        descHi: "ताजा बटन मशरूम और हर्ब्स से भरपूर चीज पिज्जा।"
    },
    {
        id: "p16_04",
        nameEn: "Paneer Pizza",
        nameHi: "पनीर पिज्जा",
        category: "pizza",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Regular", price: 150 }, { name: "Medium", price: 270 }],
        descEn: "Marinated tender paneer cubes, capsicum, onions and herbs on melted mozzarella.",
        descHi: "मसालेदार पनीर क्यूब्स, शिमला मिर्च और चीज की जुगलबंदी।"
    },
    {
        id: "p16_05",
        nameEn: "Tandoori Pizza",
        nameHi: "तंदूरी पिज्जा",
        category: "pizza",
        isVeg: true,
        variants: [{ name: "Regular", price: 160 }, { name: "Medium", price: 280 }],
        descEn: "Fusion delight topped with spicy tandoori paneer, pickled onions and tikka drizzle.",
        descHi: "तंदूरी पनीर टिक्का और देसी मसालों के तड़के वाला स्वादिष्ट पिज्जा।"
    },
    {
        id: "p16_06",
        nameEn: "Cheese Pizza",
        nameHi: "चीज पिज्जा",
        category: "pizza",
        isVeg: true,
        isBestseller: true,
        variants: [{ name: "Regular", price: 160 }, { name: "Medium", price: 280 }],
        descEn: "Double loaded gooey mozzarella and cheddar cheese blend for true cheese enthusiasts.",
        descHi: "डबल चीज लोडेड — पिघले हुए मोत्ज़ारेला और चेद्दार चीज का संगम।"
    },
    {
        id: "p16_07",
        nameEn: "F.J. Special Pizza",
        nameHi: "F.J. स्पेशल पिज्जा",
        category: "pizza",
        isVeg: true,
        isChefSpecial: true,
        isBestseller: true,
        price: 300,
        descEn: "Supreme signature pizza loaded with paneer, mushrooms, sweet corn, capsicum, olives & extra cheese.",
        descHi: "फूड जंक्शन का सिग्नेचर पिज्जा — पनीर, मशरूम, कॉर्न, शिमला मिर्च और एक्स्ट्रा चीज लोडेड।"
    },
    // Soups
    {
        id: "p16_08",
        nameEn: "Tomato Soup",
        nameHi: "टोमेटो सूप",
        category: "soups",
        isVeg: true,
        price: 120,
        descEn: "Classic velvety ripe tomato soup topped with cream and served with crispy butter croutons.",
        descHi: "मखमली टमाटर सूप, क्रीम और कुरकुरी ब्रेड क्रूटॉन्स के साथ।"
    },
    {
        id: "p16_09",
        nameEn: "Manchow Soup",
        nameHi: "मन चाहो सूप",
        category: "soups",
        isVeg: true,
        isBestseller: true,
        price: 120,
        descEn: "Spicy Indo-Chinese thick soup with minced vegetables and served with crunchy fried noodles.",
        descHi: "सब्जियों, लहसुन और तीखे सॉस का गाढ़ा सूप, कुरकुरे फ्राइड नूडल्स के साथ।"
    },
    {
        id: "p16_10",
        nameEn: "Lemon Coriander Soup",
        nameHi: "लेमन कॉरण्डर सूप",
        category: "soups",
        isVeg: true,
        price: 120,
        descEn: "Refreshing, light vitamin-packed vegetable broth infused with fresh lemon and crushed cilantro.",
        descHi: "नींबू की ताजगी और हरे धनिए के पाचक स्वाद वाला हल्का गर्म सूप।"
    },
    {
        id: "p16_11",
        nameEn: "Hot & Sour Soup",
        nameHi: "हॉट एण्ड सॉर सूप",
        category: "soups",
        isVeg: true,
        isSpicy: true,
        price: 130,
        descEn: "Classic spicy and tangy broth loaded with mushrooms, shredded vegetables and white pepper.",
        descHi: "तीखा और खट्टा सूप, सब्जियों और मशरूम के साथ।"
    },
    {
        id: "p16_12",
        nameEn: "Dhaniya Shorba Soup",
        nameHi: "धनिया सोरबा सूप",
        category: "soups",
        isVeg: true,
        price: 130,
        descEn: "Traditional aromatic Indian broth simmered with fresh cilantro roots and roasted whole spices.",
        descHi: "पारंपरिक देसी धनिए का खुशबूदार और पौष्टिक सोरबा।"
    },
    {
        id: "p16_13",
        nameEn: "Sweet Corn Soup",
        nameHi: "स्वीट कॉर्न सूप",
        category: "soups",
        isVeg: true,
        price: 150,
        descEn: "Mild, comforting thick soup prepared with sweet golden corn kernels and tender vegetables.",
        descHi: "मीठे रसीले कॉर्न और बारीक सब्जियों से बना मनपसंद क्रीमी सूप।"
    }
];

// Original 16 menu diary pages data for the PDF/Diary Flip Viewer
const MENU_PAGES = [
    { page: 1, title: "Cover Page - Welcome to Food Junction", image: "assets/page_1.jpg" },
    { page: 2, title: "Our Signature Specialties Collage", image: "assets/page_2.jpg" },
    { page: 3, title: "Thank You & Visit Us (Contact Info)", image: "assets/page_3.jpg" },
    { page: 4, title: "Main Course (Paneer Specials)", image: "assets/page_4.jpg" },
    { page: 5, title: "Main Course (Veg Gravies & Curries)", image: "assets/page_5.jpg" },
    { page: 6, title: "Chaap Gravy & Chaap Rolls", image: "assets/page_6.jpg" },
    { page: 7, title: "Chinese Dishes & Starters", image: "assets/page_7.jpg" },
    { page: 8, title: "Daal Specials, Sandwiches & Salad", image: "assets/page_8.jpg" },
    { page: 9, title: "Raita Varieties & Momos", image: "assets/page_9.jpg" },
    { page: 10, title: "Chilli Potato & Rice / Biryani", image: "assets/page_10.jpg" },
    { page: 11, title: "Chaap Snacks & Burgers", image: "assets/page_11.jpg" },
    { page: 12, title: "Tikka Rolls & Coffee / Lassi", image: "assets/page_12.jpg" },
    { page: 13, title: "Tandoori Roti, Naan, Paratha & Papad", image: "assets/page_13.jpg" },
    { page: 14, title: "South Indian & North Indian Combos", image: "assets/page_14.jpg" },
    { page: 15, title: "Thali Feasts & Chinese Combos", image: "assets/page_15.jpg" },
    { page: 16, title: "Fresh Pizzas & Piping Hot Soups", image: "assets/page_16.jpg" }
];

// Expose variables globally on window for 100% browser compatibility
if (typeof window !== 'undefined') {
    window.RESTAURANT_INFO = RESTAURANT_INFO;
    window.CATEGORIES = CATEGORIES;
    window.MENU_ITEMS = MENU_ITEMS;
    window.MENU_PAGES = MENU_PAGES;
}
