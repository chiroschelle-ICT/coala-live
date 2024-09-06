export class MefiForm {
    showMefi: boolean;
    voornaam_mefi: string;
    achternaam_mefi: string;
    geboortedatum_mefi: string;
    email_mefi: string;
    street_mefi: string;
    houseNumber_mefi: string;
    postcode_mefi: any;
    city_mefi: string;
    fullname_fam_1: string;
    fullname_fam_2: string;
    name_doctor: string;
    phone_doctor: string;
    mutuality: string;
    bloodgroup: string;
    rhesusFactor: string;
    hasDesease: boolean;
    hasSuikerziekte: boolean;
    hasAstma: boolean;
    hasHartwaal: boolean;
    hasEpilepsie: boolean;
    hasReuma: boolean;
    hasHuidaandoening: boolean;
    hasSlaapwandelen: boolean;
    hasAllergies: boolean;
    hasExtra: boolean;
    extrDeseases: string;
    isLactose: boolean;
    foodAllergie: boolean;
    fooAllegrieType: string;
    procedureSicknes: boolean;
    procedureType: string;
    tetanusVaccin: boolean;
    tetanusYear: string;
    medicineAllergie: boolean;
    medicineAllergieType: string;
    extraComplaints: boolean;
    extraComplaintsList: string;
    isVegi: boolean;
    isHalal: boolean;
    isIncontinent: boolean;
    canSport: boolean;
    canSwim: boolean;
    medicineType: string;
    timestamp: string;
    reasonIntake: string;
    allowedTakeMeds: boolean;
    leidingCanGiveMeds: boolean;
    canTakeProcedure: boolean;
    picturesOnline: boolean;
    extraComments: string;
    nameRespondents: string;
    acceptTerms: string;
  
    constructor(
      showMefi: boolean = true,
      voornaam_mefi: string = "",
      achternaam_mefi: string = "",
      geboortedatum_mefi: string = "",
      email_mefi: string = "",
      street_mefi: string = "",
      houseNumber_mefi: string = "",
      postcode_mefi: any = "",
      city_mefi: string = "",
      fullname_fam_1: string = "",
      fullname_fam_2: string = "",
      name_doctor: string = "",
      phone_doctor: string = "",
      mutuality: string = "",
      bloodgroup: string = "",
      rhesusFactor: string = "",
      hasDesease: boolean = false,
      hasSuikerziekte: boolean = false,
      hasAstma: boolean = false,
      hasHartwaal: boolean = false,
      hasEpilepsie: boolean = false,
      hasReuma: boolean = false,
      hasHuidaandoening: boolean = false,
      hasSlaapwandelen: boolean = false,
      hasAllergies: boolean = false,
      hasExtra: boolean = false,
      extrDeseases: string = "",
      isLactose: boolean = false,
      foodAllergie: boolean = false,
      fooAllegrieType: string = "",
      procedureSicknes: boolean = false,
      procedureType: string = "",
      tetanusVaccin: boolean = false,
      tetanusYear: string = "",
      medicineAllergie: boolean = false,
      medicineAllergieType: string = "",
      extraComplaints: boolean = false,
      extraComplaintsList: string = "",
      isVegi: boolean = false,
      isHalal: boolean = false,
      isIncontinent: boolean = false,
      canSport: boolean = false,
      canSwim: boolean = false,
      medicineType: string = "",
      timestamp: string = "",
      reasonIntake: string = "",
      allowedTakeMeds: boolean = false,
      leidingCanGiveMeds: boolean = false,
      canTakeProcedure: boolean = false,
      picturesOnline: boolean = false,
      extraComments: string = "",
      nameRespondents: string = "",
      acceptTerms: string = ""
    ) {
      this.showMefi = showMefi;
      this.voornaam_mefi = voornaam_mefi;
      this.achternaam_mefi = achternaam_mefi;
      this.geboortedatum_mefi = geboortedatum_mefi;
      this.email_mefi = email_mefi;
      this.street_mefi = street_mefi;
      this.houseNumber_mefi = houseNumber_mefi;
      this.postcode_mefi = postcode_mefi;
      this.city_mefi = city_mefi;
      this.fullname_fam_1 = fullname_fam_1;
      this.fullname_fam_2 = fullname_fam_2;
      this.name_doctor = name_doctor;
      this.phone_doctor = phone_doctor;
      this.mutuality = mutuality;
      this.bloodgroup = bloodgroup;
      this.rhesusFactor = rhesusFactor;
      this.hasDesease = hasDesease;
      this.hasSuikerziekte = hasSuikerziekte;
      this.hasAstma = hasAstma;
      this.hasHartwaal = hasHartwaal;
      this.hasEpilepsie = hasEpilepsie;
      this.hasReuma = hasReuma;
      this.hasHuidaandoening = hasHuidaandoening;
      this.hasSlaapwandelen = hasSlaapwandelen;
      this.hasAllergies = hasAllergies;
      this.hasExtra = hasExtra;
      this.extrDeseases = extrDeseases;
      this.isLactose = isLactose;
      this.foodAllergie = foodAllergie;
      this.fooAllegrieType = fooAllegrieType;
      this.procedureSicknes = procedureSicknes;
      this.procedureType = procedureType;
      this.tetanusVaccin = tetanusVaccin;
      this.tetanusYear = tetanusYear;
      this.medicineAllergie = medicineAllergie;
      this.medicineAllergieType = medicineAllergieType;
      this.extraComplaints = extraComplaints;
      this.extraComplaintsList = extraComplaintsList;
      this.isVegi = isVegi;
      this.isHalal = isHalal;
      this.isIncontinent = isIncontinent;
      this.canSport = canSport;
      this.canSwim = canSwim;
      this.medicineType = medicineType;
      this.timestamp = timestamp;
      this.reasonIntake = reasonIntake;
      this.allowedTakeMeds = allowedTakeMeds;
      this.leidingCanGiveMeds = leidingCanGiveMeds;
      this.canTakeProcedure = canTakeProcedure;
      this.picturesOnline = picturesOnline;
      this.extraComments = extraComments;
      this.nameRespondents = nameRespondents;
      this.acceptTerms = acceptTerms;
    }
  }
  