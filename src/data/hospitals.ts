export interface Hospital {
  id: number;
  name: string;
  lat: number;
  lng: number;
  pincode: string;
  O_pos: number;
  O_neg: number;
  A_pos: number;
  A_neg: number;
  B_pos: number;
  B_neg: number;
  AB_pos: number;
  AB_neg: number;
  Total_Units: number;
}

export type BloodGroup = 'O_pos' | 'O_neg' | 'A_pos' | 'A_neg' | 'B_pos' | 'B_neg' | 'AB_pos' | 'AB_neg';

export const bloodGroupLabels: Record<BloodGroup, string> = {
  O_pos: 'O+',
  O_neg: 'O−',
  A_pos: 'A+',
  A_neg: 'A−',
  B_pos: 'B+',
  B_neg: 'B−',
  AB_pos: 'AB+',
  AB_neg: 'AB−',
};

// Thresholds per blood group
export const THRESHOLDS = {
  critical: 20,  // below this = critical (red)
  surplus: 100,  // above this = surplus (gold)
  // between = stable (white)
};

export function getBloodStatus(units: number): 'critical' | 'stable' | 'surplus' {
  if (units <= THRESHOLDS.critical) return 'critical';
  if (units >= THRESHOLDS.surplus) return 'surplus';
  return 'stable';
}

export function getOverallStatus(hospital: Hospital): 'critical' | 'stable' | 'surplus' {
  const groups: BloodGroup[] = ['O_pos', 'O_neg', 'A_pos', 'A_neg', 'B_pos', 'B_neg', 'AB_pos', 'AB_neg'];
  let criticalCount = 0;
  let surplusCount = 0;
  for (const g of groups) {
    const s = getBloodStatus(hospital[g]);
    if (s === 'critical') criticalCount++;
    if (s === 'surplus') surplusCount++;
  }
  if (criticalCount >= 2) return 'critical';
  if (surplusCount >= 5) return 'surplus';
  return 'stable';
}

export const hospitals: Hospital[] = [
  { id: 157, name: "Chord Road Hospital Pvt Ltd", lat: 12.998121, lng: 77.540484, pincode: "560079", O_pos: 121, O_neg: 25, A_pos: 88, A_neg: 16, B_pos: 150, B_neg: 11, AB_pos: 7, AB_neg: 6, Total_Units: 424 },
  { id: 158, name: "Pristline Hospital", lat: 12.997893, lng: 77.543613, pincode: "560079", O_pos: 110, O_neg: 22, A_pos: 129, A_neg: 21, B_pos: 186, B_neg: 31, AB_pos: 35, AB_neg: 27, Total_Units: 561 },
  { id: 159, name: "Manipal Northside Hospital", lat: 13.001128, lng: 77.563929, pincode: "560003", O_pos: 129, O_neg: 48, A_pos: 150, A_neg: 12, B_pos: 108, B_neg: 21, AB_pos: 63, AB_neg: 19, Total_Units: 550 },
  { id: 160, name: "Mallya Audikesh Diagnostics Center", lat: 12.981505, lng: 77.601194, pincode: "560001", O_pos: 142, O_neg: 24, A_pos: 82, A_neg: 9, B_pos: 180, B_neg: 43, AB_pos: 27, AB_neg: 30, Total_Units: 537 },
  { id: 161, name: "Mallige Medical Centre", lat: 12.985247, lng: 77.580385, pincode: "560001", O_pos: 142, O_neg: 27, A_pos: 85, A_neg: 13, B_pos: 139, B_neg: 27, AB_pos: 31, AB_neg: 0, Total_Units: 464 },
  { id: 162, name: "Government Maternity Hospital", lat: 12.998860, lng: 77.581742, pincode: "Unknown", O_pos: 166, O_neg: 22, A_pos: 100, A_neg: 31, B_pos: 124, B_neg: 29, AB_pos: 26, AB_neg: 38, Total_Units: 536 },
  { id: 163, name: "Soujanya Clinic", lat: 12.968119, lng: 77.543250, pincode: "Unknown", O_pos: 93, O_neg: 7, A_pos: 86, A_neg: 7, B_pos: 141, B_neg: 13, AB_pos: 13, AB_neg: 26, Total_Units: 386 },
  { id: 164, name: "Hospital", lat: 13.004364, lng: 77.565296, pincode: "Unknown", O_pos: 85, O_neg: 12, A_pos: 69, A_neg: 20, B_pos: 96, B_neg: 16, AB_pos: 27, AB_neg: 3, Total_Units: 328 },
  { id: 165, name: "Suprabha Hospital", lat: 13.007938, lng: 77.546906, pincode: "Unknown", O_pos: 126, O_neg: 41, A_pos: 79, A_neg: 15, B_pos: 122, B_neg: 4, AB_pos: 23, AB_neg: 39, Total_Units: 449 },
  { id: 166, name: "Sangolli Nursing Home", lat: 13.008356, lng: 77.546927, pincode: "Unknown", O_pos: 179, O_neg: 7, A_pos: 81, A_neg: 3, B_pos: 107, B_neg: 2, AB_pos: 20, AB_neg: 71, Total_Units: 470 },
  { id: 167, name: "Diacon Hospital", lat: 13.003768, lng: 77.549834, pincode: "560010", O_pos: 128, O_neg: 11, A_pos: 131, A_neg: 14, B_pos: 116, B_neg: 15, AB_pos: 43, AB_neg: 4, Total_Units: 462 },
  { id: 168, name: "Namratha Hospital", lat: 13.004786, lng: 77.543073, pincode: "Unknown", O_pos: 144, O_neg: 22, A_pos: 116, A_neg: 12, B_pos: 151, B_neg: 31, AB_pos: 44, AB_neg: 37, Total_Units: 557 },
  { id: 170, name: "Fortis Hospital", lat: 13.002241, lng: 77.549088, pincode: "560086", O_pos: 155, O_neg: 9, A_pos: 66, A_neg: 15, B_pos: 118, B_neg: 0, AB_pos: 61, AB_neg: 14, Total_Units: 438 },
  { id: 171, name: "Citi Hospital", lat: 12.995651, lng: 77.551070, pincode: "560010", O_pos: 104, O_neg: 47, A_pos: 120, A_neg: 24, B_pos: 173, B_neg: 24, AB_pos: 10, AB_neg: 27, Total_Units: 529 },
  { id: 172, name: "Vasan Eye Care Hospital, Rajaji Nagar", lat: 12.999522, lng: 77.550533, pincode: "560010", O_pos: 116, O_neg: 33, A_pos: 109, A_neg: 26, B_pos: 118, B_neg: 2, AB_pos: 26, AB_neg: 33, Total_Units: 463 },
  { id: 173, name: "Ananya Hospital", lat: 12.999821, lng: 77.550450, pincode: "560010", O_pos: 135, O_neg: 16, A_pos: 65, A_neg: 13, B_pos: 138, B_neg: 40, AB_pos: 46, AB_neg: 1, Total_Units: 454 },
  { id: 174, name: "Baptist", lat: 12.997091, lng: 77.571977, pincode: "Unknown", O_pos: 118, O_neg: 20, A_pos: 110, A_neg: 27, B_pos: 112, B_neg: 0, AB_pos: 37, AB_neg: 5, Total_Units: 429 },
  { id: 175, name: "Shivakrupa Hospital", lat: 12.973967, lng: 77.547914, pincode: "Unknown", O_pos: 136, O_neg: 14, A_pos: 78, A_neg: 20, B_pos: 116, B_neg: 6, AB_pos: 26, AB_neg: 38, Total_Units: 434 },
  { id: 176, name: "Sri Maruthi hospital, Sheshadripuram", lat: 12.992644, lng: 77.574205, pincode: "560020", O_pos: 100, O_neg: 6, A_pos: 107, A_neg: 1, B_pos: 172, B_neg: 19, AB_pos: 40, AB_neg: 24, Total_Units: 469 },
  { id: 177, name: "Gayathri Hospital, Bengaluru Urban", lat: 12.974405, lng: 77.542682, pincode: "560040", O_pos: 143, O_neg: 8, A_pos: 88, A_neg: 38, B_pos: 144, B_neg: 38, AB_pos: 86, AB_neg: 4, Total_Units: 549 },
  { id: 178, name: "Cloud Nine Hospital", lat: 13.007874, lng: 77.562532, pincode: "Unknown", O_pos: 118, O_neg: 27, A_pos: 68, A_neg: 7, B_pos: 127, B_neg: 34, AB_pos: 12, AB_neg: 10, Total_Units: 403 },
  { id: 179, name: "Nayak Hospital, Gayathri Nagar", lat: 12.999386, lng: 77.560640, pincode: "560021", O_pos: 150, O_neg: 43, A_pos: 71, A_neg: 22, B_pos: 113, B_neg: 0, AB_pos: 69, AB_neg: 35, Total_Units: 503 },
  { id: 180, name: "Shanbhag Hospital", lat: 12.985688, lng: 77.543542, pincode: "560079", O_pos: 115, O_neg: 18, A_pos: 72, A_neg: 0, B_pos: 125, B_neg: 17, AB_pos: 48, AB_neg: 36, Total_Units: 431 },
  { id: 181, name: "Trupti Nursing Home", lat: 12.994657, lng: 77.539754, pincode: "560079", O_pos: 164, O_neg: 4, A_pos: 88, A_neg: 4, B_pos: 171, B_neg: 22, AB_pos: 45, AB_neg: 21, Total_Units: 519 },
  { id: 182, name: "Krupa Medical center", lat: 13.000431, lng: 77.541166, pincode: "Unknown", O_pos: 120, O_neg: 17, A_pos: 104, A_neg: 15, B_pos: 128, B_neg: 64, AB_pos: 35, AB_neg: 12, Total_Units: 495 },
  { id: 183, name: "Penta Care Ayurvedic Hospital", lat: 12.973689, lng: 77.536948, pincode: "560040", O_pos: 114, O_neg: 46, A_pos: 121, A_neg: 28, B_pos: 121, B_neg: 23, AB_pos: 39, AB_neg: 16, Total_Units: 508 },
  { id: 184, name: "Shreya Poly Clinic", lat: 12.972913, lng: 77.539472, pincode: "560040", O_pos: 49, O_neg: 8, A_pos: 72, A_neg: 48, B_pos: 67, B_neg: 23, AB_pos: 47, AB_neg: 5, Total_Units: 319 },
  { id: 185, name: "Pragathi Ayurvedic Center", lat: 12.984370, lng: 77.555666, pincode: "Unknown", O_pos: 118, O_neg: 7, A_pos: 112, A_neg: 24, B_pos: 124, B_neg: 13, AB_pos: 32, AB_neg: 46, Total_Units: 476 },
  { id: 186, name: "Leela Hospital and Diagnostic Center", lat: 13.000267, lng: 77.569489, pincode: "560003", O_pos: 132, O_neg: 14, A_pos: 69, A_neg: 0, B_pos: 123, B_neg: 30, AB_pos: 48, AB_neg: 23, Total_Units: 439 },
  { id: 187, name: "Dr. Rajkumar Blood Bank", lat: 12.968031, lng: 77.587822, pincode: "Unknown", O_pos: 152, O_neg: 21, A_pos: 36, A_neg: 38, B_pos: 124, B_neg: 21, AB_pos: 28, AB_neg: 22, Total_Units: 442 },
  { id: 188, name: "Shifa Hospital, Bengaluru Urban", lat: 12.990011, lng: 77.598811, pincode: "Unknown", O_pos: 115, O_neg: 0, A_pos: 96, A_neg: 14, B_pos: 120, B_neg: 20, AB_pos: 27, AB_neg: 10, Total_Units: 402 },
  { id: 189, name: "Hospital", lat: 12.976705, lng: 77.542417, pincode: "Unknown", O_pos: 123, O_neg: 27, A_pos: 71, A_neg: 33, B_pos: 126, B_neg: 29, AB_pos: 35, AB_neg: 25, Total_Units: 469 },
  { id: 190, name: "Dr Raos Maternity Hospital", lat: 12.985042, lng: 77.546048, pincode: "560079", O_pos: 131, O_neg: 15, A_pos: 113, A_neg: 30, B_pos: 200, B_neg: 37, AB_pos: 67, AB_neg: 8, Total_Units: 601 },
  { id: 191, name: "Shiva Kumaraswamy Building", lat: 12.971705, lng: 77.549372, pincode: "Unknown", O_pos: 137, O_neg: 3, A_pos: 72, A_neg: 20, B_pos: 113, B_neg: 10, AB_pos: 29, AB_neg: 42, Total_Units: 426 },
  { id: 192, name: "Dr Solankis Eye Hospital", lat: 12.995163, lng: 77.573814, pincode: "560020", O_pos: 138, O_neg: 35, A_pos: 52, A_neg: 21, B_pos: 113, B_neg: 15, AB_pos: 29, AB_neg: 14, Total_Units: 417 },
  { id: 193, name: "Sri Sanjeevini Cold Laser Therapy", lat: 13.005392, lng: 77.571335, pincode: "560003", O_pos: 119, O_neg: 33, A_pos: 83, A_neg: 34, B_pos: 169, B_neg: 17, AB_pos: 65, AB_neg: 26, Total_Units: 546 },
  { id: 194, name: "St. Martha's Heart Centre", lat: 12.970544, lng: 77.583477, pincode: "560001", O_pos: 88, O_neg: 37, A_pos: 28, A_neg: 1, B_pos: 97, B_neg: 8, AB_pos: 81, AB_neg: 9, Total_Units: 349 },
  { id: 195, name: "Desai Nursing Home", lat: 12.986374, lng: 77.579315, pincode: "560001", O_pos: 84, O_neg: 40, A_pos: 125, A_neg: 12, B_pos: 112, B_neg: 15, AB_pos: 18, AB_neg: 10, Total_Units: 416 },
  { id: 196, name: "Fortis Hospital", lat: 12.988165, lng: 77.554818, pincode: "560010", O_pos: 112, O_neg: 6, A_pos: 73, A_neg: 16, B_pos: 127, B_neg: 30, AB_pos: 50, AB_neg: 21, Total_Units: 435 },
  { id: 197, name: "Ayushman Ayurvedic therapy centre", lat: 12.994616, lng: 77.602387, pincode: "Unknown", O_pos: 104, O_neg: 6, A_pos: 120, A_neg: 2, B_pos: 129, B_neg: 13, AB_pos: 36, AB_neg: 12, Total_Units: 422 },
  { id: 198, name: "Pristine Hospital", lat: 12.998423, lng: 77.540389, pincode: "560010", O_pos: 142, O_neg: 5, A_pos: 100, A_neg: 23, B_pos: 114, B_neg: 0, AB_pos: 21, AB_neg: 30, Total_Units: 435 },
  { id: 199, name: "Arogya Kendra", lat: 12.973589, lng: 77.544328, pincode: "560040", O_pos: 157, O_neg: 13, A_pos: 45, A_neg: 27, B_pos: 168, B_neg: 9, AB_pos: 23, AB_neg: 0, Total_Units: 442 },
  { id: 200, name: "The Family Doctor Malleswaram", lat: 13.002969, lng: 77.552667, pincode: "560010", O_pos: 188, O_neg: 20, A_pos: 97, A_neg: 5, B_pos: 147, B_neg: 29, AB_pos: 21, AB_neg: 66, Total_Units: 573 },
  { id: 201, name: "V Care Medical Systems P Ltd", lat: 12.978705, lng: 77.540358, pincode: "Unknown", O_pos: 133, O_neg: 0, A_pos: 38, A_neg: 0, B_pos: 90, B_neg: 28, AB_pos: 15, AB_neg: 3, Total_Units: 307 },
  { id: 202, name: "Saikrupa Hospital For Women's and Surgical Centre", lat: 12.969166, lng: 77.535192, pincode: "560040", O_pos: 116, O_neg: 17, A_pos: 74, A_neg: 26, B_pos: 130, B_neg: 6, AB_pos: 52, AB_neg: 31, Total_Units: 452 },
  { id: 203, name: "Cutis Academy of Cutaneous Sciences", lat: 12.976812, lng: 77.544909, pincode: "560040", O_pos: 164, O_neg: 32, A_pos: 114, A_neg: 4, B_pos: 121, B_neg: 11, AB_pos: 71, AB_neg: 10, Total_Units: 527 },
  { id: 204, name: "Vijayanagar Global Hospital", lat: 12.971790, lng: 77.537286, pincode: "560040", O_pos: 109, O_neg: 16, A_pos: 71, A_neg: 22, B_pos: 135, B_neg: 10, AB_pos: 16, AB_neg: 13, Total_Units: 392 },
  { id: 205, name: "The Homoeo World", lat: 12.994720, lng: 77.571588, pincode: "560003", O_pos: 112, O_neg: 21, A_pos: 104, A_neg: 31, B_pos: 144, B_neg: 32, AB_pos: 45, AB_neg: 4, Total_Units: 493 },
  { id: 206, name: "Tamara Hospital & IVF Centre", lat: 13.004450, lng: 77.553076, pincode: "560010", O_pos: 148, O_neg: 20, A_pos: 83, A_neg: 19, B_pos: 118, B_neg: 5, AB_pos: 71, AB_neg: 18, Total_Units: 482 },
  { id: 207, name: "ChanRe Rheumatology and Immunology Center", lat: 12.995573, lng: 77.535421, pincode: "Unknown", O_pos: 149, O_neg: 33, A_pos: 94, A_neg: 14, B_pos: 146, B_neg: 48, AB_pos: 47, AB_neg: 32, Total_Units: 563 },
  { id: 208, name: "Manasa Hospital, Vijayanagar", lat: 12.970946, lng: 77.545106, pincode: "560040", O_pos: 99, O_neg: 29, A_pos: 95, A_neg: 1, B_pos: 105, B_neg: 18, AB_pos: 41, AB_neg: 11, Total_Units: 399 },
  { id: 209, name: "Cauvery Orthopaedic Centre", lat: 12.998489, lng: 77.550422, pincode: "560010", O_pos: 109, O_neg: 9, A_pos: 102, A_neg: 32, B_pos: 110, B_neg: 25, AB_pos: 51, AB_neg: 13, Total_Units: 451 },
  { id: 210, name: "Nethradhama Eye Hospital, Rajajinagar", lat: 12.997613, lng: 77.550942, pincode: "560021", O_pos: 139, O_neg: 25, A_pos: 72, A_neg: 23, B_pos: 110, B_neg: 0, AB_pos: 50, AB_neg: 16, Total_Units: 435 },
  { id: 211, name: "Hosmat Hospital", lat: 13.008000, lng: 77.583748, pincode: "Unknown", O_pos: 171, O_neg: 15, A_pos: 129, A_neg: 33, B_pos: 125, B_neg: 9, AB_pos: 29, AB_neg: 38, Total_Units: 549 },
  { id: 212, name: "Altius Hospital", lat: 12.984954, lng: 77.556922, pincode: "560010", O_pos: 131, O_neg: 17, A_pos: 78, A_neg: 8, B_pos: 80, B_neg: 42, AB_pos: 58, AB_neg: 30, Total_Units: 444 },
  { id: 213, name: "Bangalore Diabetes Hospital", lat: 12.991841, lng: 77.596853, pincode: "Unknown", O_pos: 115, O_neg: 31, A_pos: 90, A_neg: 13, B_pos: 170, B_neg: 51, AB_pos: 10, AB_neg: 6, Total_Units: 486 },
  { id: 214, name: "Vathsalya Speciality Hospital", lat: 12.993975, lng: 77.539180, pincode: "560079", O_pos: 123, O_neg: 32, A_pos: 112, A_neg: 27, B_pos: 187, B_neg: 19, AB_pos: 61, AB_neg: 8, Total_Units: 569 },
  { id: 215, name: "Maruthi Hospital", lat: 12.967761, lng: 77.541328, pincode: "560072", O_pos: 152, O_neg: 39, A_pos: 96, A_neg: 8, B_pos: 157, B_neg: 9, AB_pos: 84, AB_neg: 17, Total_Units: 562 },
  { id: 216, name: "The Eye Surgical Centre", lat: 12.982195, lng: 77.549314, pincode: "560010", O_pos: 100, O_neg: 42, A_pos: 85, A_neg: 21, B_pos: 138, B_neg: 38, AB_pos: 69, AB_neg: 25, Total_Units: 518 },
  { id: 217, name: "Dr. Agrawal's Eye Hospital", lat: 12.999898, lng: 77.550112, pincode: "560004", O_pos: 165, O_neg: 15, A_pos: 137, A_neg: 4, B_pos: 139, B_neg: 18, AB_pos: 32, AB_neg: 25, Total_Units: 535 },
  { id: 218, name: "Ashok Hospital", lat: 12.994891, lng: 77.534798, pincode: "560079", O_pos: 162, O_neg: 49, A_pos: 108, A_neg: 13, B_pos: 113, B_neg: 17, AB_pos: 11, AB_neg: 4, Total_Units: 477 },
  { id: 219, name: "Dr. B. Venkatasubbarao Memorial Hospital", lat: 12.998198, lng: 77.568151, pincode: "560003", O_pos: 119, O_neg: 13, A_pos: 102, A_neg: 30, B_pos: 139, B_neg: 32, AB_pos: 52, AB_neg: 1, Total_Units: 488 },
  { id: 220, name: "Jupiter Hospital", lat: 12.999846, lng: 77.566365, pincode: "560003", O_pos: 127, O_neg: 37, A_pos: 88, A_neg: 41, B_pos: 163, B_neg: 1, AB_pos: 32, AB_neg: 7, Total_Units: 496 },
  { id: 221, name: "Radha Maternity and Surgical Hospital", lat: 12.969044, lng: 77.568854, pincode: "560053", O_pos: 135, O_neg: 7, A_pos: 79, A_neg: 0, B_pos: 122, B_neg: 14, AB_pos: 25, AB_neg: 31, Total_Units: 413 },
  { id: 222, name: "Hitech Kidney Stone Hospital", lat: 12.987810, lng: 77.580983, pincode: "560001", O_pos: 162, O_neg: 34, A_pos: 105, A_neg: 33, B_pos: 138, B_neg: 32, AB_pos: 20, AB_neg: 0, Total_Units: 524 },
  { id: 223, name: "Sri Dhavantari Ayurveda Hospital", lat: 12.982219, lng: 77.559937, pincode: "560010", O_pos: 141, O_neg: 13, A_pos: 98, A_neg: 29, B_pos: 150, B_neg: 13, AB_pos: 57, AB_neg: 15, Total_Units: 516 },
  { id: 224, name: "Vaidyam Hospital", lat: 12.984551, lng: 77.552832, pincode: "560040", O_pos: 178, O_neg: 40, A_pos: 73, A_neg: 33, B_pos: 181, B_neg: 5, AB_pos: 46, AB_neg: 26, Total_Units: 582 },
  { id: 225, name: "Suresh Hospital", lat: 12.989774, lng: 77.555101, pincode: "560010", O_pos: 120, O_neg: 31, A_pos: 125, A_neg: 36, B_pos: 85, B_neg: 42, AB_pos: 58, AB_neg: 7, Total_Units: 504 },
  { id: 226, name: "Lakshmi Maternity Home", lat: 13.005823, lng: 77.569451, pincode: "560055", O_pos: 110, O_neg: 2, A_pos: 94, A_neg: 0, B_pos: 134, B_neg: 6, AB_pos: 20, AB_neg: 0, Total_Units: 366 },
  { id: 227, name: "Manjunatha Maternity Home", lat: 13.007727, lng: 77.569699, pincode: "560055", O_pos: 118, O_neg: 5, A_pos: 136, A_neg: 11, B_pos: 111, B_neg: 23, AB_pos: 59, AB_neg: 16, Total_Units: 479 },
  { id: 228, name: "Samprathi Eye Hospital", lat: 12.993281, lng: 77.580691, pincode: "560020", O_pos: 154, O_neg: 30, A_pos: 84, A_neg: 34, B_pos: 159, B_neg: 36, AB_pos: 75, AB_neg: 2, Total_Units: 574 },
  { id: 229, name: "Shankara Nethralaya Eye Hospital", lat: 13.008995, lng: 77.540619, pincode: "560096", O_pos: 147, O_neg: 18, A_pos: 108, A_neg: 26, B_pos: 152, B_neg: 37, AB_pos: 29, AB_neg: 12, Total_Units: 529 },
  { id: 230, name: "ChanRe Rheumatology Center", lat: 12.999208, lng: 77.550269, pincode: "560010", O_pos: 128, O_neg: 50, A_pos: 79, A_neg: 34, B_pos: 141, B_neg: 0, AB_pos: 33, AB_neg: 18, Total_Units: 483 },
  { id: 231, name: "Malleswaram Eye Day Care Hospital", lat: 12.996668, lng: 77.571604, pincode: "560003", O_pos: 123, O_neg: 13, A_pos: 98, A_neg: 0, B_pos: 101, B_neg: 54, AB_pos: 45, AB_neg: 20, Total_Units: 454 },
  { id: 232, name: "Mahaveer Eye Hospital", lat: 12.993355, lng: 77.572959, pincode: "560020", O_pos: 160, O_neg: 5, A_pos: 73, A_neg: 6, B_pos: 137, B_neg: 24, AB_pos: 41, AB_neg: 27, Total_Units: 473 },
  { id: 233, name: "Bilva Hospital", lat: 12.998983, lng: 77.580202, pincode: "560003", O_pos: 139, O_neg: 1, A_pos: 74, A_neg: 19, B_pos: 129, B_neg: 3, AB_pos: 23, AB_neg: 25, Total_Units: 413 },
  { id: 234, name: "Anugraha Hospital, Vijayanagar", lat: 12.976565, lng: 77.545588, pincode: "560079", O_pos: 139, O_neg: 37, A_pos: 95, A_neg: 31, B_pos: 114, B_neg: 15, AB_pos: 64, AB_neg: 30, Total_Units: 525 },
  { id: 235, name: "Amar Hospital", lat: 12.971182, lng: 77.578123, pincode: "560053", O_pos: 168, O_neg: 52, A_pos: 93, A_neg: 30, B_pos: 160, B_neg: 5, AB_pos: 67, AB_neg: 50, Total_Units: 625 },
  { id: 236, name: "Supriya Hospital", lat: 12.992904, lng: 77.558802, pincode: "560021", O_pos: 109, O_neg: 19, A_pos: 65, A_neg: 18, B_pos: 89, B_neg: 4, AB_pos: 22, AB_neg: 1, Total_Units: 327 },
  { id: 237, name: "Sidvin Hospital Pvt Ltd", lat: 12.982442, lng: 77.549368, pincode: "560010", O_pos: 113, O_neg: 29, A_pos: 108, A_neg: 21, B_pos: 163, B_neg: 16, AB_pos: 43, AB_neg: 23, Total_Units: 516 },
  { id: 238, name: "Place Guttahalli Maternity Home", lat: 12.998824, lng: 77.581989, pincode: "560003", O_pos: 120, O_neg: 12, A_pos: 107, A_neg: 2, B_pos: 184, B_neg: 44, AB_pos: 30, AB_neg: 21, Total_Units: 520 },
  { id: 239, name: "Namratha Nursing And Maternity Home", lat: 13.004575, lng: 77.543273, pincode: "560086", O_pos: 123, O_neg: 32, A_pos: 96, A_neg: 16, B_pos: 128, B_neg: 8, AB_pos: 76, AB_neg: 15, Total_Units: 494 },
  { id: 240, name: "Spine Care And Ortho Care Hospital", lat: 12.974513, lng: 77.549388, pincode: "560086", O_pos: 111, O_neg: 18, A_pos: 85, A_neg: 6, B_pos: 133, B_neg: 28, AB_pos: 41, AB_neg: 22, Total_Units: 444 },
  { id: 241, name: "Tanmay Hospital", lat: 12.973376, lng: 77.547403, pincode: "560040", O_pos: 111, O_neg: 20, A_pos: 126, A_neg: 15, B_pos: 156, B_neg: 19, AB_pos: 59, AB_neg: 12, Total_Units: 518 },
  { id: 242, name: "Vijayanagar Hospital", lat: 12.971629, lng: 77.537197, pincode: "560040", O_pos: 132, O_neg: 5, A_pos: 82, A_neg: 12, B_pos: 87, B_neg: 45, AB_pos: 29, AB_neg: 22, Total_Units: 414 },
  { id: 243, name: "Punarjyoti Eye Hospital", lat: 12.968530, lng: 77.584396, pincode: "560002", O_pos: 147, O_neg: 13, A_pos: 71, A_neg: 32, B_pos: 152, B_neg: 37, AB_pos: 49, AB_neg: 1, Total_Units: 502 },
  { id: 244, name: "Sreeniwasa Hospital", lat: 12.973271, lng: 77.572536, pincode: "560053", O_pos: 163, O_neg: 30, A_pos: 121, A_neg: 23, B_pos: 128, B_neg: 9, AB_pos: 47, AB_neg: 12, Total_Units: 533 },
  { id: 245, name: "Magadi Road Maternity Home", lat: 12.974125, lng: 77.561823, pincode: "560023", O_pos: 68, O_neg: 25, A_pos: 64, A_neg: 50, B_pos: 90, B_neg: 5, AB_pos: 48, AB_neg: 3, Total_Units: 353 },
  { id: 246, name: "Pristine Hospital", lat: 12.998001, lng: 77.543278, pincode: "560086", O_pos: 180, O_neg: 74, A_pos: 97, A_neg: 2, B_pos: 123, B_neg: 17, AB_pos: 14, AB_neg: 26, Total_Units: 533 },
  { id: 247, name: "Punya Hospital", lat: 12.986216, lng: 77.537485, pincode: "560079", O_pos: 183, O_neg: 24, A_pos: 72, A_neg: 34, B_pos: 135, B_neg: 37, AB_pos: 36, AB_neg: 0, Total_Units: 521 },
  { id: 248, name: "Sri Ranga Arogyadhama", lat: 12.998624, lng: 77.542782, pincode: "560086", O_pos: 143, O_neg: 28, A_pos: 103, A_neg: 11, B_pos: 146, B_neg: 30, AB_pos: 79, AB_neg: 39, Total_Units: 579 },
  { id: 249, name: "Rotary Eye Hospital", lat: 12.981723, lng: 77.554936, pincode: "560010", O_pos: 88, O_neg: 18, A_pos: 73, A_neg: 36, B_pos: 165, B_neg: 13, AB_pos: 36, AB_neg: 35, Total_Units: 464 },
  { id: 250, name: "Gurukripa Hospital", lat: 13.000180, lng: 77.546115, pincode: "560086", O_pos: 158, O_neg: 32, A_pos: 76, A_neg: 22, B_pos: 130, B_neg: 29, AB_pos: 41, AB_neg: 19, Total_Units: 507 },
  { id: 251, name: "Madhu Hospital", lat: 12.978316, lng: 77.542960, pincode: "560079", O_pos: 118, O_neg: 19, A_pos: 109, A_neg: 0, B_pos: 100, B_neg: 14, AB_pos: 38, AB_neg: 33, Total_Units: 431 },
  { id: 252, name: "Padmashree Diagnostics", lat: 12.974598, lng: 77.543679, pincode: "Unknown", O_pos: 149, O_neg: 30, A_pos: 110, A_neg: 13, B_pos: 110, B_neg: 45, AB_pos: 39, AB_neg: 21, Total_Units: 517 },
  { id: 253, name: "K.C. General Hospital", lat: 12.993382, lng: 77.569417, pincode: "560003", O_pos: 99, O_neg: 6, A_pos: 105, A_neg: 21, B_pos: 99, B_neg: 0, AB_pos: 75, AB_neg: 6, Total_Units: 411 },
  { id: 254, name: "Yashas Neurocare", lat: 12.985399, lng: 77.545402, pincode: "Unknown", O_pos: 101, O_neg: 4, A_pos: 123, A_neg: 14, B_pos: 143, B_neg: 26, AB_pos: 38, AB_neg: 19, Total_Units: 468 },
  { id: 255, name: "Focus Diagnostic Center", lat: 12.987063, lng: 77.549951, pincode: "Unknown", O_pos: 129, O_neg: 17, A_pos: 50, A_neg: 20, B_pos: 143, B_neg: 32, AB_pos: 5, AB_neg: 19, Total_Units: 415 },
  { id: 256, name: "Kamadhenu Hospital", lat: 12.975501, lng: 77.534972, pincode: "560040", O_pos: 101, O_neg: 25, A_pos: 77, A_neg: 62, B_pos: 99, B_neg: 18, AB_pos: 31, AB_neg: 3, Total_Units: 416 },
  { id: 257, name: "Government Hospital, Hosahalli", lat: 12.974493, lng: 77.534205, pincode: "560040", O_pos: 112, O_neg: 26, A_pos: 83, A_neg: 19, B_pos: 135, B_neg: 22, AB_pos: 29, AB_neg: 25, Total_Units: 451 },
  { id: 258, name: "Sriprasad Ayurveda", lat: 12.973409, lng: 77.546281, pincode: "560040", O_pos: 116, O_neg: 28, A_pos: 133, A_neg: 14, B_pos: 122, B_neg: 0, AB_pos: 55, AB_neg: 14, Total_Units: 482 },
  { id: 259, name: "Vidya Eye Hospital", lat: 12.970743, lng: 77.537768, pincode: "560040", O_pos: 104, O_neg: 5, A_pos: 91, A_neg: 5, B_pos: 157, B_neg: 31, AB_pos: 41, AB_neg: 45, Total_Units: 479 },
  { id: 260, name: "G.R. Hospital", lat: 12.980230, lng: 77.554882, pincode: "560010", O_pos: 91, O_neg: 27, A_pos: 42, A_neg: 47, B_pos: 68, B_neg: 19, AB_pos: 24, AB_neg: 27, Total_Units: 345 },
  { id: 261, name: "Sneha Horizon Hospital", lat: 12.975430, lng: 77.535800, pincode: "560040", O_pos: 124, O_neg: 16, A_pos: 94, A_neg: 19, B_pos: 99, B_neg: 14, AB_pos: 12, AB_neg: 21, Total_Units: 399 },
  { id: 262, name: "Kangroo Hospital", lat: 12.974339, lng: 77.542325, pincode: "560040", O_pos: 114, O_neg: 13, A_pos: 111, A_neg: 9, B_pos: 116, B_neg: 40, AB_pos: 42, AB_neg: 14, Total_Units: 459 },
  { id: 263, name: "Abhinav Hospital", lat: 12.975749, lng: 77.553782, pincode: "560023", O_pos: 102, O_neg: 1, A_pos: 96, A_neg: 12, B_pos: 153, B_neg: 5, AB_pos: 31, AB_neg: 2, Total_Units: 402 },
  { id: 264, name: "Suhusannidhi Hospital", lat: 12.969102, lng: 77.534951, pincode: "560040", O_pos: 98, O_neg: 0, A_pos: 83, A_neg: 36, B_pos: 117, B_neg: 43, AB_pos: 21, AB_neg: 47, Total_Units: 445 },
  { id: 265, name: "Sai Ortho and Dental Centre", lat: 12.969819, lng: 77.536080, pincode: "560040", O_pos: 91, O_neg: 17, A_pos: 126, A_neg: 51, B_pos: 122, B_neg: 1, AB_pos: 45, AB_neg: 15, Total_Units: 468 },
  { id: 266, name: "Ammashrees Hospital", lat: 12.979432, lng: 77.544164, pincode: "560010", O_pos: 135, O_neg: 5, A_pos: 112, A_neg: 34, B_pos: 136, B_neg: 17, AB_pos: 43, AB_neg: 10, Total_Units: 492 },
  { id: 267, name: "Bengaluru Child Neurology Centre", lat: 12.973557, lng: 77.546125, pincode: "560040", O_pos: 161, O_neg: 10, A_pos: 68, A_neg: 11, B_pos: 118, B_neg: 26, AB_pos: 60, AB_neg: 17, Total_Units: 471 },
  { id: 268, name: "Dr. Nothesh Child Specialist", lat: 12.975423, lng: 77.540659, pincode: "560040", O_pos: 142, O_neg: 23, A_pos: 61, A_neg: 58, B_pos: 89, B_neg: 18, AB_pos: 30, AB_neg: 49, Total_Units: 470 },
  { id: 269, name: "Manavarthapet Pregnancy Hospital", lat: 12.970255, lng: 77.573457, pincode: "560053", O_pos: 126, O_neg: 24, A_pos: 92, A_neg: 31, B_pos: 100, B_neg: 19, AB_pos: 35, AB_neg: 6, Total_Units: 433 },
  { id: 270, name: "ESI Hospital", lat: 12.972126, lng: 77.573351, pincode: "560053", O_pos: 123, O_neg: 18, A_pos: 112, A_neg: 13, B_pos: 109, B_neg: 13, AB_pos: 32, AB_neg: 0, Total_Units: 420 },
  { id: 271, name: "Nayanalaya Eye Care Centre", lat: 13.006795, lng: 77.571159, pincode: "Unknown", O_pos: 86, O_neg: 14, A_pos: 98, A_neg: 33, B_pos: 133, B_neg: 46, AB_pos: 43, AB_neg: 9, Total_Units: 462 },
  { id: 272, name: "Srinidhi Health Centre", lat: 13.005821, lng: 77.572575, pincode: "Unknown", O_pos: 142, O_neg: 19, A_pos: 66, A_neg: 30, B_pos: 114, B_neg: 31, AB_pos: 50, AB_neg: 12, Total_Units: 464 },
  { id: 273, name: "Orthopedic & Eye Care Center", lat: 13.005493, lng: 77.571952, pincode: "Unknown", O_pos: 115, O_neg: 13, A_pos: 109, A_neg: 8, B_pos: 139, B_neg: 45, AB_pos: 26, AB_neg: 16, Total_Units: 471 },
  { id: 274, name: "ESI Hospital", lat: 13.004596, lng: 77.554003, pincode: "Unknown", O_pos: 145, O_neg: 42, A_pos: 39, A_neg: 2, B_pos: 154, B_neg: 38, AB_pos: 46, AB_neg: 0, Total_Units: 466 },
  { id: 275, name: "Ramani Orthopaedic Hospital", lat: 13.004431, lng: 77.578524, pincode: "Unknown", O_pos: 118, O_neg: 29, A_pos: 122, A_neg: 4, B_pos: 127, B_neg: 11, AB_pos: 64, AB_neg: 33, Total_Units: 508 },
  { id: 276, name: "Atharva Ayurdhama Hospital", lat: 13.004314, lng: 77.547749, pincode: "Unknown", O_pos: 96, O_neg: 17, A_pos: 125, A_neg: 20, B_pos: 124, B_neg: 21, AB_pos: 43, AB_neg: 20, Total_Units: 466 },
  { id: 277, name: "RICH CARE HOMEOPATHY", lat: 13.001546, lng: 77.572168, pincode: "Unknown", O_pos: 137, O_neg: 41, A_pos: 81, A_neg: 21, B_pos: 129, B_neg: 0, AB_pos: 15, AB_neg: 35, Total_Units: 459 },
  { id: 278, name: "Poornayu Ayurveda Hospital", lat: 12.998238, lng: 77.551173, pincode: "Unknown", O_pos: 102, O_neg: 12, A_pos: 91, A_neg: 28, B_pos: 104, B_neg: 30, AB_pos: 28, AB_neg: 30, Total_Units: 425 },
  { id: 279, name: "Appllo Diagnostic", lat: 12.998106, lng: 77.600813, pincode: "Unknown", O_pos: 150, O_neg: 18, A_pos: 108, A_neg: 10, B_pos: 184, B_neg: 20, AB_pos: 52, AB_neg: 3, Total_Units: 545 },
  { id: 280, name: "Supra Diagnostics", lat: 12.997000, lng: 77.573004, pincode: "Unknown", O_pos: 69, O_neg: 8, A_pos: 89, A_neg: 1, B_pos: 92, B_neg: 20, AB_pos: 41, AB_neg: 6, Total_Units: 326 },
  { id: 281, name: "K.C. General Hospital", lat: 12.996024, lng: 77.569371, pincode: "Unknown", O_pos: 139, O_neg: 21, A_pos: 105, A_neg: 8, B_pos: 129, B_neg: 24, AB_pos: 44, AB_neg: 57, Total_Units: 527 },
  { id: 282, name: "ESIC Model Hospital", lat: 12.991692, lng: 77.553901, pincode: "Unknown", O_pos: 143, O_neg: 14, A_pos: 65, A_neg: 31, B_pos: 137, B_neg: 10, AB_pos: 56, AB_neg: 22, Total_Units: 478 },
  { id: 283, name: "Government Hospital", lat: 12.990505, lng: 77.556635, pincode: "Unknown", O_pos: 164, O_neg: 7, A_pos: 71, A_neg: 38, B_pos: 137, B_neg: 0, AB_pos: 76, AB_neg: 53, Total_Units: 546 },
  { id: 284, name: "ESI Hospital Bangalore", lat: 12.990498, lng: 77.553092, pincode: "Unknown", O_pos: 155, O_neg: 56, A_pos: 21, A_neg: 25, B_pos: 127, B_neg: 33, AB_pos: 27, AB_neg: 45, Total_Units: 489 },
  { id: 285, name: "Government Hospital", lat: 12.984496, lng: 77.555180, pincode: "Unknown", O_pos: 111, O_neg: 35, A_pos: 115, A_neg: 20, B_pos: 103, B_neg: 48, AB_pos: 74, AB_neg: 20, Total_Units: 526 },
  { id: 286, name: "Janani Clinics", lat: 12.991850, lng: 77.543783, pincode: "560079", O_pos: 95, O_neg: 22, A_pos: 68, A_neg: 21, B_pos: 58, B_neg: 45, AB_pos: 51, AB_neg: 13, Total_Units: 373 },
  { id: 287, name: "PMC Hospital", lat: 13.006505, lng: 77.554501, pincode: "Unknown", O_pos: 114, O_neg: 7, A_pos: 142, A_neg: 24, B_pos: 121, B_neg: 10, AB_pos: 76, AB_neg: 12, Total_Units: 506 },
  { id: 288, name: "New Varalakshmi Hospital", lat: 12.998838, lng: 77.555096, pincode: "Unknown", O_pos: 141, O_neg: 7, A_pos: 84, A_neg: 4, B_pos: 156, B_neg: 34, AB_pos: 52, AB_neg: 28, Total_Units: 506 },
  { id: 289, name: "Apollo Cradle Children's Hospital", lat: 13.002768, lng: 77.553629, pincode: "Unknown", O_pos: 143, O_neg: 33, A_pos: 109, A_neg: 39, B_pos: 104, B_neg: 6, AB_pos: 15, AB_neg: 21, Total_Units: 470 },
  { id: 290, name: "Netradhama", lat: 12.997430, lng: 77.551029, pincode: "Unknown", O_pos: 135, O_neg: 24, A_pos: 90, A_neg: 18, B_pos: 174, B_neg: 34, AB_pos: 32, AB_neg: 37, Total_Units: 544 },
  { id: 291, name: "Hiremath Hospital", lat: 12.975435, lng: 77.535897, pincode: "Unknown", O_pos: 118, O_neg: 9, A_pos: 63, A_neg: 8, B_pos: 102, B_neg: 70, AB_pos: 55, AB_neg: 19, Total_Units: 444 },
  { id: 292, name: "Jindal Charitable Hospital", lat: 12.993725, lng: 77.553972, pincode: "Unknown", O_pos: 112, O_neg: 27, A_pos: 114, A_neg: 22, B_pos: 134, B_neg: 43, AB_pos: 30, AB_neg: 36, Total_Units: 518 },
];
