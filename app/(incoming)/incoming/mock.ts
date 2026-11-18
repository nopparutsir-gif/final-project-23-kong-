// บอกว่าคำขอเข้าแผนกและงานในแผนกเก็บข้อมูลอะไรบ้าง
interface IncomingRequest {
  id: string;
  category: string;
  title: string;
  from: string;
  date: string;
  requester: string;
  destination: string;
  requestedDate: string;
  approvedBy: string;
  approverRole: string;
  approvedDate: string;
  priority: string;
  detail: string;
}

export interface DepartmentRequest {
  id: string;
  title: string;
  owner: string;
  date: string;
  progress: number;
  status: string;
  category: string;
}

// ใช้โดย incoming/page.tsx แสดงรายการ และหน้า incomingView/incomingReject แสดงรายละเอียดหรือทำรายการ
export const INCOMING: IncomingRequest[] = [
  {
    id: "REQ-2611-014",
    category: "พัฒนาใหม่",
    title: "ขอจัดซื้อเครื่องพิมพ์ฉลากสำหรับคลังสินค้า",
    from: "หัวหน้าต้นสังกัด · กรกฎ พัฒนา",
    date: "11 พ.ย. 2569",
    requester: "สมชาย ใจดี",
    destination: "แผนก IT",
    requestedDate: "ยังไม่ระบุ",
    approvedBy: "กรกฎ พัฒนา",
    approverRole: "หัวหน้าต้นสังกัด",
    approvedDate: "11 พ.ย. 2569",
    priority: "ด่วน",
    detail:
      "ต้องการเครื่องพิมพ์ฉลากความร้อน 2 เครื่อง พร้อมม้วนฉลากสำรอง ใช้งานที่คลังสินค้าสาขาบางนา",
  },
  {
    id: "REQ-2611-012",
    category: "ปรับปรุง",
    title: "ขอปรับปรุงระบบรายงานยอดขายรายสัปดาห์",
    from: "หัวหน้าต้นสังกัด · กรกฎ พัฒนา",
    date: "10 พ.ย. 2569",
    requester: "วิภา รัตนชัย",
    destination: "แผนก IT",
    requestedDate: "ยังไม่ระบุ",
    approvedBy: "กรกฎ พัฒนา",
    approverRole: "หัวหน้าต้นสังกัด",
    approvedDate: "10 พ.ย. 2569",
    priority: "ปกติ",
    detail:
      "ปรับรูปแบบรายงานให้ส่งออกเป็น Excel ได้ และเพิ่มตัวกรองตามภูมิภาค",
  },
  {
    id: "REQ-2611-017",
    category: "แก้ปัญหา",
    title: "ขอเปลี่ยนอุปกรณ์คอมพิวเตอร์สำหรับฝ่ายบุคคล",
    from: "หัวหน้าต้นสังกัด · กรกฎ พัฒนา",
    date: "15 พ.ย. 2569",
    requester: "อรทัย พูลเพิ่ม",
    destination: "แผนก IT",
    requestedDate: "ยังไม่ระบุ",
    approvedBy: "กรกฎ พัฒนา",
    approverRole: "หัวหน้าต้นสังกัด",
    approvedDate: "15 พ.ย. 2569",
    priority: "ปกติ",
    detail:
      "ขอเปลี่ยนอุปกรณ์คอมพิวเตอร์ที่ชำรุด เพื่อให้ทีมฝ่ายบุคคลทำงานได้ต่อเนื่อง",
  },
];

// ใช้ทำยอดสรุปใน incoming/page.tsx และแสดงรายการที่หน้า dept/page.tsx
export const IN_DEPT: DepartmentRequest[] = [
  {
    id: "REQ-2611-005",
    title: "ขอติดตั้งซอฟต์แวร์ออกแบบสำหรับทีมการตลาด",
    owner: "อรุณี แสงทอง",
    date: "5 พ.ย. 2569",
    progress: 60,
    status: "กำลังดำเนินการ",
    category: "พัฒนาใหม่",
  },
  {
    id: "REQ-2610-092",
    title: "ขอตรวจเช็คระบบเครือข่ายชั้น 3",
    owner: "ชัยวัฒน์ มีสุข",
    date: "30 ต.ค. 2569",
    progress: 100,
    status: "เสร็จสิ้น",
    category: "แก้ปัญหา",
  },
  {
    id: "REQ-2610-083",
    title: "ขอย้ายเซิร์ฟเวอร์ไปห้องใหม่",
    owner: "อรุณี แสงทอง",
    date: "22 ต.ค. 2569",
    progress: 40,
    status: "รอดำเนินการ",
    category: "ปรับปรุง",
  },
];

// รายชื่อที่แสดงในช่องเลือกผู้รับผิดชอบใน incomingView/page.tsx
export const TEAM: string[] = [
  "อรุณี แสงทอง",
  "ชัยวัฒน์ มีสุข",
  "พิมพ์ลดา คงเจริญ",
  "ณัฐพล ทองดี",
];

// รายชื่อแผนกที่แสดงในช่องเลือกปลายทางใน incomingReject/page.tsx
export const FORWARD_TO: string[] = [
  "ทีมซัพพอร์ต (Helpdesk)",
  "ทีมเครือข่าย (Network)",
  "ทีมระบบ (Infrastructure)",
  "ทีมพัฒนาซอฟต์แวร์",
  "ฝ่ายจัดซื้อ",
];
