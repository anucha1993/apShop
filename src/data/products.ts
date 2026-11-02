import type { Product } from "@/types/product";

/** Builds an optimised Unsplash URL from a photo id. */
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const IMAGES = {
  hero: img("photo-1539109136881-3be0616acf4b"),
  editorial: img("photo-1490481651871-ab68de25d43d"),
  women: img("photo-1485968579580-b6d095142e6e"),
  men: img("photo-1617137968427-85924c800a22"),
  unisex: img("photo-1548126032-079a0fb0099d"),
};

export const products: Product[] = [
  {
    id: "p01",
    slug: "essential-crew-tee",
    name: "Essential Crew Tee",
    type: "เสื้อยืด",
    category: "unisex",
    price: 590,
    description:
      "เสื้อยืดคอกลมทรงตรง ผ้าคอตตอนเนื้อแน่นแต่สวมสบาย ตัวเลือกพื้นฐานที่ใส่ได้ทุกวันและจับคู่ได้กับทุกลุค",
    material: "คอตตอน 100% (Supima) น้ำหนัก 220 GSM",
    care: ["ซักเครื่องน้ำเย็น", "กลับด้านก่อนซัก", "รีดไฟอ่อน"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "White",
        hex: "#f5f5f2",
        family: "white",
        images: [img("photo-1521572163474-6864f9cf17ab"), img("photo-1562157873-818bc0726f68")],
        stock: { S: 12, M: 20, L: 8, XL: 0 },
      },
      {
        name: "Black",
        hex: "#111111",
        family: "black",
        images: [img("photo-1618354691373-d851c5c3a990"), img("photo-1622519407650-3df9883f76a5")],
        stock: { S: 5, M: 2, L: 14, XL: 6 },
      },
      {
        name: "Heather Blue",
        hex: "#a9c1db",
        family: "blue",
        images: [img("photo-1564584217132-2271feaeb3c5"), img("photo-1562157873-818bc0726f68")],
        stock: { S: 0, M: 7, L: 3, XL: 1 },
      },
    ],
    createdAt: "2026-10-28",
  },
  {
    id: "p02",
    slug: "oxford-button-down-shirt",
    name: "Oxford Button-Down Shirt",
    type: "เสื้อเชิ้ต",
    category: "men",
    price: 1490,
    description:
      "เชิ้ตผ้าอ็อกซ์ฟอร์ดคอปก Button-down ทรง Regular Fit ใส่ทำงานหรือพับแขนใส่ลำลองก็ดูดี",
    material: "คอตตอนอ็อกซ์ฟอร์ด 100%",
    care: ["ซักเครื่องน้ำเย็น", "ตากในที่ร่ม", "รีดไฟปานกลาง"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "White",
        hex: "#f7f7f7",
        family: "white",
        images: [img("photo-1598033129183-c4f50c736f10"), img("photo-1602810318383-e386cc2a3ccf")],
        stock: { S: 4, M: 10, L: 9, XL: 3 },
      },
      {
        name: "Chambray",
        hex: "#5f7fa3",
        family: "blue",
        images: [img("photo-1596755094514-f87e34085b2c"), img("photo-1602810318383-e386cc2a3ccf")],
        stock: { S: 0, M: 3, L: 0, XL: 2 },
      },
    ],
    createdAt: "2026-09-12",
  },
  {
    id: "p03",
    slug: "leather-biker-jacket",
    name: "Leather Biker Jacket",
    type: "แจ็กเก็ต",
    category: "unisex",
    price: 6990,
    compareAtPrice: 8490,
    description:
      "แจ็กเก็ตหนังแท้ทรงไบเกอร์คลาสสิก ซิปเฉียง ปกแบะ ซับในผ้าซาติน เนื้อหนังจะนุ่มและมีเสน่ห์ขึ้นตามการใช้งาน",
    material: "หนังแกะแท้ 100% ซับในโพลีเอสเตอร์",
    care: ["ห้ามซัก ใช้บริการซักแห้งเฉพาะหนัง", "เก็บในไม้แขวนบ่ากว้าง"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Black",
        hex: "#111111",
        family: "black",
        images: [img("photo-1551028719-00167b16eac5"), img("photo-1520975954732-35dd22299614")],
        stock: { S: 1, M: 0, L: 2, XL: 0 },
      },
    ],
    createdAt: "2026-10-05",
  },
  {
    id: "p04",
    slug: "satin-bomber-jacket",
    name: "Satin Bomber Jacket",
    type: "แจ็กเก็ต",
    category: "women",
    price: 2490,
    description:
      "บอมเบอร์ผ้าซาตินเงาเล็กน้อย ขอบแขนและชายเสื้อผ้าริบ กระเป๋าซิปที่แขน น้ำหนักเบาเหมาะกับอากาศเย็นสบาย",
    material: "โพลีเอสเตอร์ซาติน 100%",
    care: ["ซักมือน้ำเย็น", "ห้ามปั่นแห้ง", "รีดไฟอ่อนด้านใน"],
    sizes: ["S", "M", "L"],
    colors: [
      {
        name: "Rust",
        hex: "#b46a47",
        family: "brown",
        images: [img("photo-1591047139829-d91aecb6caea"), img("photo-1490481651871-ab68de25d43d")],
        stock: { S: 6, M: 4, L: 2 },
      },
    ],
    createdAt: "2026-10-20",
  },
  {
    id: "p05",
    slug: "utility-field-jacket",
    name: "Utility Field Jacket",
    type: "แจ็กเก็ต",
    category: "women",
    price: 2890,
    description:
      "ฟิลด์แจ็กเก็ตทรงหลวมสไตล์ยูทิลิตี้ กระเป๋าหน้า 4 ช่อง ปรับเอวด้วยเชือกรูดด้านใน ใส่ทับเสื้อยืดหรือฮู้ดก็เข้ากัน",
    material: "คอตตอนทวิล 100%",
    care: ["ซักเครื่องน้ำเย็น", "ซักแยกสี", "รีดไฟปานกลาง"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Olive",
        hex: "#5b6142",
        family: "green",
        images: [img("photo-1544022613-e87ca75a784a"), img("photo-1556905055-8f358a7a47b2")],
        stock: { S: 3, M: 8, L: 5, XL: 2 },
      },
    ],
    createdAt: "2026-08-30",
  },
  {
    id: "p06",
    slug: "relaxed-crew-sweatshirt",
    name: "Relaxed Crew Sweatshirt",
    type: "สเวตเตอร์",
    category: "unisex",
    price: 1290,
    description:
      "สเวตเชิ้ตคอกลมทรงหลวมไหล่ตก ด้านในเป็นผ้าสำลีขนนุ่ม อบอุ่นแต่ไม่หนา เหมาะกับห้องแอร์และวันฝนพรำ",
    material: "คอตตอน 80% โพลีเอสเตอร์ 20%",
    care: ["ซักเครื่องน้ำเย็น", "กลับด้านก่อนซัก", "ห้ามใช้น้ำยาฟอกขาว"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Ecru",
        hex: "#f1ede4",
        family: "white",
        images: [img("photo-1620799140408-edc6dcb6d633")],
        stock: { S: 9, M: 12, L: 10, XL: 4 },
      },
      {
        name: "Tangerine",
        hex: "#e8782a",
        family: "orange",
        images: [img("photo-1578587018452-892bacefd3f2")],
        stock: { S: 2, M: 0, L: 5, XL: 0 },
      },
    ],
    createdAt: "2026-10-30",
  },
  {
    id: "p07",
    slug: "slim-tapered-chino",
    name: "Slim Tapered Chino",
    type: "กางเกง",
    category: "men",
    price: 1390,
    compareAtPrice: 1690,
    description:
      "กางเกงชิโน่ทรงสลิมปลายขาเรียว ผ้ายืดเล็กน้อยเคลื่อนไหวคล่องตัว ปลายขาจั๊มพ์ใส่คู่สนีกเกอร์ได้ลงตัว",
    material: "คอตตอน 98% อีลาสเทน 2%",
    care: ["ซักเครื่องน้ำเย็น", "ตากในที่ร่ม", "รีดไฟปานกลาง"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Khaki",
        hex: "#b9a37e",
        family: "beige",
        images: [img("photo-1473966968600-fa801b869a1a"), img("photo-1593030761757-71fae45fa0e7")],
        stock: { S: 6, M: 11, L: 7, XL: 3 },
      },
    ],
    createdAt: "2026-07-18",
  },
  {
    id: "p08",
    slug: "high-rise-skinny-jeans",
    name: "High-Rise Skinny Jeans",
    type: "กางเกงยีนส์",
    category: "women",
    price: 1790,
    description:
      "ยีนส์เอวสูงทรงสกินนี่ ผ้าเดนิมยืดกระชับรูปร่าง ใส่สบายตลอดวัน ปลายขาเก้าส่วนเผยข้อเท้าดูเพรียว",
    material: "คอตตอน 92% โพลีเอสเตอร์ 6% อีลาสเทน 2%",
    care: ["กลับด้านก่อนซัก", "ซักน้ำเย็นแยกสี", "ห้ามปั่นแห้ง"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Light Wash",
        hex: "#a9c4dd",
        family: "blue",
        images: [img("photo-1584370848010-d7fe6bc767ec")],
        stock: { S: 8, M: 6, L: 0, XL: 2 },
      },
      {
        name: "Rinse Indigo",
        hex: "#24324d",
        family: "navy",
        images: [img("photo-1624378439575-d8705ad7ae80")],
        stock: { S: 3, M: 9, L: 4, XL: 0 },
      },
    ],
    createdAt: "2026-09-25",
  },
  {
    id: "p09",
    slug: "floral-midi-wrap-dress",
    name: "Floral Midi Wrap Dress",
    type: "เดรส",
    category: "women",
    price: 2290,
    description:
      "เดรสป้ายทรงมิดี้ลายดอกไม้ ผ้าวิสโคสพลิ้วเบา ผูกเอวปรับได้ เหมาะกับวันพักผ่อนริมทะเลหรือมื้อสายวันหยุด",
    material: "วิสโคส 100%",
    care: ["ซักมือน้ำเย็น", "ห้ามบิด", "ตากในที่ร่ม"],
    sizes: ["S", "M", "L"],
    colors: [
      {
        name: "Ivory Floral",
        hex: "#efe6da",
        family: "beige",
        images: [img("photo-1496747611176-843222e1e57c")],
        stock: { S: 4, M: 5, L: 1 },
      },
    ],
    createdAt: "2026-10-12",
  },
  {
    id: "p10",
    slug: "off-shoulder-ruffle-dress",
    name: "Off-Shoulder Ruffle Dress",
    type: "เดรส",
    category: "women",
    price: 1990,
    description:
      "มินิเดรสเปิดไหล่แต่งระบายสองชั้น ผ้าคอตตอนพอปลินบางเบา ยางยืดที่ไหล่ช่วยให้ทรงอยู่ตัว",
    material: "คอตตอนพอปลิน 100%",
    care: ["ซักมือน้ำเย็น", "รีดไฟปานกลาง"],
    sizes: ["S", "M", "L"],
    colors: [
      {
        name: "White",
        hex: "#fafafa",
        family: "white",
        images: [img("photo-1515372039744-b8f02a3ae446")],
        stock: { S: 0, M: 3, L: 0 },
      },
    ],
    createdAt: "2026-06-14",
  },
  {
    id: "p11",
    slug: "checked-wool-blend-blazer",
    name: "Checked Wool-Blend Blazer",
    type: "เบลเซอร์",
    category: "women",
    price: 3990,
    description:
      "เบลเซอร์ทรงโอเวอร์ไซซ์ลายตาราง ผ้าวูลผสมเนื้อนุ่มทิ้งตัว กระดุมสองแถว บ่าเสริมเล็กน้อยให้ทรงคมชัด",
    material: "วูล 60% โพลีเอสเตอร์ 40% ซับในวิสโคส",
    care: ["ซักแห้งเท่านั้น", "เก็บในไม้แขวนบ่ากว้าง"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Grey Check",
        hex: "#8f8f8c",
        family: "grey",
        images: [img("photo-1608234808654-2a8875faa7fd")],
        stock: { S: 2, M: 4, L: 3, XL: 1 },
      },
      {
        name: "Forest Tartan",
        hex: "#24364a",
        family: "navy",
        images: [img("photo-1485968579580-b6d095142e6e")],
        stock: { S: 1, M: 0, L: 2, XL: 0 },
      },
    ],
    createdAt: "2026-10-01",
  },
  {
    id: "p12",
    slug: "pleated-wide-jogger",
    name: "Pleated Wide Jogger",
    type: "กางเกง",
    category: "women",
    price: 1590,
    description:
      "กางเกงจ๊อกเกอร์จับจีบหน้า ทรงกว้างปลายขายางยืด ผ้าเครปเนื้อลื่นไม่ยับง่าย ใส่ได้ทั้งวันทำงานและวันสบาย ๆ",
    material: "โพลีเอสเตอร์เครป 95% อีลาสเทน 5%",
    care: ["ซักเครื่องโหมดถนอมผ้า", "ตากในที่ร่ม"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Blush",
        hex: "#e3b7ad",
        family: "pink",
        images: [img("photo-1594633312681-425c7b97ccd1")],
        stock: { S: 5, M: 7, L: 6, XL: 2 },
      },
    ],
    createdAt: "2026-08-08",
  },
  {
    id: "p13",
    slug: "tailored-suit-blazer",
    name: "Tailored Suit Blazer",
    type: "เบลเซอร์",
    category: "men",
    price: 4590,
    description:
      "เบลเซอร์สูทตัดเย็บทรง Slim ปกนอตช์ กระดุมสองเม็ด ผ้าวูลผสมระบายอากาศดี ใส่คู่กางเกงสูทหรือยีนส์ก็เนี้ยบ",
    material: "วูล 70% โพลีเอสเตอร์ 30%",
    care: ["ซักแห้งเท่านั้น", "รีดไอน้ำผ่านผ้า"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Navy",
        hex: "#1f2a44",
        family: "navy",
        images: [img("photo-1617137968427-85924c800a22"), img("photo-1593030761757-71fae45fa0e7")],
        stock: { S: 2, M: 5, L: 4, XL: 0 },
      },
    ],
    createdAt: "2026-09-02",
  },
  {
    id: "p14",
    slug: "fringe-knit-poncho",
    name: "Fringe Knit Poncho",
    type: "นิตแวร์",
    category: "women",
    price: 1890,
    description:
      "ปอนโชถักมือลายตาข่าย คอวี แต่งพู่รอบชาย ใส่คลุมทับเดรสหรือเสื้อยืดเพิ่มความโบฮีเมียนแบบเรียบง่าย",
    material: "คอตตอน 70% อะคริลิก 30%",
    care: ["ซักมือน้ำเย็น", "ตากแนวราบ", "ห้ามแขวนขณะเปียก"],
    sizes: ["S", "M"],
    colors: [
      {
        name: "Cream",
        hex: "#ece2cf",
        family: "beige",
        images: [img("photo-1434389677669-e08b4cac3105"), img("photo-1556905055-8f358a7a47b2")],
        stock: { S: 3, M: 4 },
      },
    ],
    createdAt: "2026-10-24",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
