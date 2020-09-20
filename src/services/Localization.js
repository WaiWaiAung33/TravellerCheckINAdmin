import * as Localization from "expo-localization";
import i18n from "i18n-js";

//import Services
import { getItem } from "@services/Storage";
//import consts
import { LANGUAGE } from "@consts/Const";

//English Language
const EN = {
  //Login Screen
  title: "Welcome to Naypyitaw Traveller Application",
  login: "Register",
  createform: "To Fill the Information",
  tolegatelist: "To display at checkpoint",
  travelnote: "Traveller History",
  createtitle: "Create Register",
  usertype: "Choose User Type",
  name: "Name",
  nrcno: "Citizenship Verification Card",
  phone: "Phone Number",
  vehical: "Vehicle Number",
  forino: "Passport ‌Number",
  gotostep: "Step 2",
  startcity: "Start City",
  endplace: "Where do you want to go?",
  ministray: "Ministray",
  forising: "Passport Photo",
  visa: "Visa Photo",
  support: "Letter of recommendation",
  nrcfront: "NRC Front Photo",
  nrcback: "NRC Back Photo",
  mo: "Travel Permit MO",
  religion: "Religious Verification Card Front",
  retligionback: "Religious Verification Card Back",
  qrlist: "QR Code ဖတ်ရန်",
  cancelregister: "Cancel Register",
  search: "Search",
  detail: "Detail",
  Bhikkhu: "Bhikkhu",
  religionNo: "NRC",
  edittitle: "Edit",
  save: "Save",
  createnew: "Create New",
  people: "People",
  goverment: "Goverment Employee",
  bhikkhu: "Bhikkhu",
  army: "Army",
  forigner: "Foreigner",
  all: "All",
  allow: "Allowed to come",
  tofix: "To fix",
  approve: "Approved",
  quartine: "Quarantine",
  createsuccesss: "Succesfully Created Register",
  editsuccess: "Your data is successfully updated.",
  cancelsuccess: "Your data is successfully deleted.",
  errorname: "Please your name.",
  errornrccode: "Select nrc code.",
  errornrcstate: "Select nrc State.",
  errornrcnumber: "Select nrc number",
  errorforigenno: "Enter forigen number",
  errorcity: "Select City",
  errortownship: "Select Township",
  erroraddress: "Enter your address",
  errorforigenphoto: "Choose passport photo",
  errorforigenvisaphoto: "Choose visa photo",
  errorapprovephoto: "Choose approve photo",
  errornrcfrontphot: "Choose Nrc Front photo",
  errornrcbackphoto: "Choose Nrc Back photo",
  errormohpoto: "Choose MO photo",
  errorbhikkhufrontphoto: "Choose Bhikkhu front photo",
  errorbhikkhubackphoto: "Choose Bhikkhu back photo",
  placeholdername: "hla hla",
  placeholdernrccode: "1",
  placeholdernrcnumber: "111111",
  placeholderaddress: "address",
  allowq: "Allowed to come Quarantine",
  register_user: "Register",
  Bhikkhuname:"ဘွဲ့တော်",
  naypyitaw:"Naypyidaw",
  designation:"Designation",
  department:"Department",
  ministry_name:"Ministry Name",
  errordesignation:"Enter Designation",
  errordepartment:"Enter Department",
  errorministryinput:"Enter ministry name",
  gender:"Male/Female",
  male:"Male",
  female:"Female",
  email:"Email",
  password:"Password",
  loginadmin:"Login"
};

//Myanmar Language
const MM = {
  //Login Screen
  title: "နေပြည်တော်ဝင်ခွင့်လျှောက်လွှာမှကြိုဆိုပါ၏",
  login: "လျှောက်လွှာတင်မည်",
  createform: "အချက်အလက်များဖြည့်ရန်",
  tolegatelist: "စစ်ဆေးရေးဂိတ်တွင်ပြရန်",
  travelnote: "ခရီးသွားမှတ်တမ်းများ",
  createtitle: "အချက်အလက်များဖြည့်ရန်",
  usertype: "အသုံးပြုသူအမျိုးအစားရွေချယ်ရန်",
  name: "အမည်",
  nrcno: "နိုင်ငံသားစိစစ်ရေးကဒ်ပြားနံပါတ်",
  phone: "ဖုန်းနံပါတ်",
  vehical: "ယာဉ်နံပါတ်",
  forino: "နိုင်ငံကူးနံပါတ်",
  gotostep: "အဆင့်(၂)သို့",
  startcity: "စတင်ထွက်ခွာသည့်မြို့",
  endplace: "သွားရောက်လိုသည့်နေရာ",
  ministray: "ဝန်ကြီးဌာန",
  forising: "နိုင်ငံကူးလက်မှတ်",
  visa: "ဗီဇာပုံ",
  support: "ထောက်ခံစာများ",
  nrcfront: "မှတ်ပုံတင်အရှေ့ဘက်",
  nrcback: "မှတ်ပုံတင်အနောက်ဘက်",
  mo: "ခရီးသွားလာခွန့်အမိန့်MO",
  religion: "သာသနာဝင်စိစစ်ရေးကဒ်ပြားအရှေ့ဘက်",
  retligionback: "သာသနာဝင်စိစစ်ရေးကဒ်ပြားအနောက်ဘက်",
  qrlist: "QR Code ဖတ်ရန်",
  cancelregister: "လျှောက်လွှာပယ်ဖျက်မည်",
  search: "ရှာမည်",
  detail: "အသေးစိတ်အချက်အလက်များ",
  Bhikkhu: "ရဟန်းရှင်",
  religionNo: "သာသနာဝင်စိစစ်ရေးကဒ်ပြားနံပါတ်",
  edittitle: "အချက်အလက်များပြင်ရန်",
  save: "သိမ်းမည်",
  createnew: "အသစ်ထည့်မည်",
  people: "ပြည်သူ",
  goverment: "နိုင်ငံဝန်ထမ်း",
  bhikkhu: "ရဟန်းရှင်",
  army: "စစ်မူ့ထမ်း",
  forigner: "နိုင်ငံခြားသား",
  all: "အားလုံး",
  allow: "လာရောက်ခွင့်ပြုသည်",
  tofix: "ပြင်ဆင်ရန်",
  approve: "လက်ခံသည်",
  quartine: "စောင့်ကြည့်ခံရမည်",
  createsuccesss: "လျှောက်လွှာတင်ခြင်းအောင်မြင်ပါသည်",
  editsuccess: "အချက်အလက်ပြင်ဆင်မူအောင်မြင်ပါသည်",
  cancelsuccess: "လျှောက်လွှာပယ်ဖျက်မူအောင်မြင်ပါသည်",
  errorname: "အမည်ထည့်ပေးပါရန်",
  errornrccode: "NRC Code ရွေးပေးပါရန်",
  errornrcstate: "NRC State ရွေးပေးပါရန်",
  errornrcnumber: "မှတ်ပုံတင်နံပါတ်ရွေးပေးပါရန်",
  errorforigenno: "နိုင်ငံကူးနံပါတ်ထည့်ပေးပါရန်",
  errorcity: "မြို့ရွေးချယ်ပေးပါရန်",
  errortownship: "မြို့နယ်ရွေးချယ်ပေးပါရန်",
  erroraddress: "လိပ်စာထည့်ပေးပါရန်",
  errorforigenphoto: "နိုင်ငံကူးလက်မှတ်ပုံထည့်ပေးပါရန်",
  errorforigenvisaphoto: "ဗီဇာပုံထည့်ပေးပါရန်",
  errorapprovephoto: "ထောက်ခံစာပုံထည့်ပေးပါရန်",
  errornrcfrontphot: "မှတ်ပုံတင်အရှေ့ဘက်ပုံထည့်ပေးပါရန်",
  errornrcbackphoto: "မှတ်ပုံတင်အနောက်ဘက်ပုံထည့်ပေးပါရန်",
  errormohpoto: "ခရီးသွားလာခွင့်အမိန့်MOပုံထည့်ပေးပါရန်",
  errorbhikkhufrontphoto: "သာသနာဝင်စိစစ်ရေးကဒ်ပြားအရှေ့ဘက်ပုံထည့်ပေးပါရန်",
  errorbhikkhubackphoto: "သာသနာဝင်စိစစ်ရေးကဒ်ပြားအနောက်ဘက်ပုံထည့်ပေးပါရန်",
  placeholdername: "လှလှ",
  placeholdernrccode: "1",
  placeholdernrcnumber: "၁၁၁၁၁၁",
  placeholderaddress: "လိပ်စာ",
  allowq: "လာရောက်ခွင့်ပြုသည်Qဝင်ရမည်",
  register_user: "လျှောက်လွှာတင်ထားသည်",
  Bhikkhuname:"ဘွဲ့တော်",
  naypyitaw:"နေပြည်တော်",
  designation:"ရာထူး",
  department:"ဌာန",
  ministry_name:"ဝန်ကြီးဌာန",
  errordesignation:"ရာထူး‌ထည့်ပေးပါရန်",
  errordepartment:"ဌာနထည့်ပေးပါရန်",
  errorministryinput:"ဝန်ကြီးဌာနထည့်ပေးပါရန်",
  gender:"ကျား/မ",
  male:"ကျား",
  female:"မ",
  email:"အီးမေးလ်",
  password:"လျှို့ဝှက်နံပါတ်",
  loginadmin:"ဝင်မည်"
};

i18n.fallbacks = true;
i18n.translations = { EN, MM };
i18n.locale = Localization.locale;

export const t = (scope, locale) => {
  return i18n.t(scope, { locale: locale });
};

export const getLang = async () => {
  return new Promise((resolve, reject) => {
    getItem(LANGUAGE)
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          resolve("MM");
        }
      })
      .catch((err) => reject(err));
  });
};
