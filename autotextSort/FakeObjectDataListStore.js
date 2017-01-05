var faker = require('faker');

class FakeObjectDataListStore {
  constructor(/*number*/ size){
    this.size = size || 2000;
    this._cache = [];
  }

  createFakeRowObjectData(/*number*/ index) /*object*/ {
    return {
      id: index,
      avatar: faker.image.avatar(),
      city: faker.address.city(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence(),
    };
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    if (index < 0 || index > this.size){
      return undefined;
    }
    if (this._cache[index] === undefined) {
      this._cache[index] = this.createFakeRowObjectData(index);
    }
    return  [{
            "ABBREVIATION" : ".PEDvac",
            "CONTENTS" : "PEDIATRIC VACCINE ORDER^^^^Order must be signed by a provider licensed to prescribe.^^^^ORDERING PHYSICIAN: _^^^^[_] Past history of vaccine adverse reactions and contraindications reviewed, documented under the online Allergies list as indicated.^^^^[_] Vaccine counseling performed personally by the physician. (CPT codes 90465-90468 for patients under 8 years old.)^^^^SPECIAL INSTRUCTIONS: _^^^^Administer vaccines:^^^^2, 4, 6 months:^^[_] Pediatrix (DTaP-IPV-HepB), Hib, Prevnar^^[_] RotaTeq^^[_] Influenza (intramuscular, 6 months and up)^^^^12 months:^^[_] MMR, Prevnar, HepA^^[_] MMRV, Prevnar, HepA^^[_] Influenza (intramuscular)^^^^15-18 months:^^[_] DTaP, Hib, Varicella^^[_] HepA^^[_] Influenza (intramuscular)^^^^4-6 years:^^[_] DTaP, IPV, MMR, Varicella^^[_] DTaP, IPV, MMRV^^[_] HepA^^[_] Influenza (intramuscular)^^[_] Influenza (nasal)^^^^Individual vaccines (use ONLY if not using an order set above):^^^^[_] Pediarix (DTaP-IPV-HepB) [_] Hib [_] Prevnar^^[_] DTaP [_] IPV [_] HepB^^[_] RotaTeq^^[_] Influenza (intramuscular)^^[_] Influenza (nasal)^^[_] MMR [_] HepA^^[_] MMRV [_] Varicella^^[_] Tdap [_] Menactra (MCV4)^^[_] HPV^^[_] Other: _^^^^"
          },
          {
            "ABBREVIATION" : ".PEDvac",
            "CONTENTS" : "PEDIATRIC VACCINE ORDER^^^^Order must be signed by a provider licensed to prescribe.^^^^ORDERING PHYSICIAN: _^^^^[_] Past history of vaccine adverse reactions and contraindications reviewed, documented under the online Allergies list as indicated.^^^^[_] Vaccine counseling performed personally by the physician. (CPT codes 90465-90468 for patients under 8 years old.)^^^^SPECIAL INSTRUCTIONS: _^^^^Administer vaccines:^^^^2, 4, 6 months:^^[_] Pediatrix (DTaP-IPV-HepB), Hib, Prevnar^^[_] RotaTeq^^[_] Influenza (intramuscular, 6 months and up)^^^^12 months:^^[_] MMR, Prevnar, HepA^^[_] MMRV, Prevnar, HepA^^[_] Influenza (intramuscular)^^^^15-18 months:^^[_] DTaP, Hib, Varicella^^[_] HepA^^[_] Influenza (intramuscular)^^^^4-6 years:^^[_] DTaP, IPV, MMR, Varicella^^[_] DTaP, IPV, MMRV^^[_] HepA^^[_] Influenza (intramuscular)^^[_] Influenza (nasal)^^^^Individual vaccines (use ONLY if not using an order set above):^^^^[_] Pediarix (DTaP-IPV-HepB) [_] Hib [_] Prevnar^^[_] DTaP [_] IPV [_] HepB^^[_] RotaTeq^^[_] Influenza (intramuscular)^^[_] Influenza (nasal)^^[_] MMR [_] HepA^^[_] MMRV [_] Varicella^^[_] Tdap [_] Menactra (MCV4)^^[_] HPV^^[_] Other: _^^^^"
          }];
  }

  /**
  * Populates the entire cache with data.
  * Use with Caution! Behaves slowly for large sizes
  * ex. 100,000 rows
  */
  getAll() {

    return       [{
            "ABBREVIATION" : ".PEDvac",
            "CONTENTS" : "PEDIATRIC VACCINE ORDER^^^^Order must be signed by a provider licensed to prescribe.^^^^ORDERING PHYSICIAN: _^^^^[_] Past history of vaccine adverse reactions and contraindications reviewed, documented under the online Allergies list as indicated.^^^^[_] Vaccine counseling performed personally by the physician. (CPT codes 90465-90468 for patients under 8 years old.)^^^^SPECIAL INSTRUCTIONS: _^^^^Administer vaccines:^^^^2, 4, 6 months:^^[_] Pediatrix (DTaP-IPV-HepB), Hib, Prevnar^^[_] RotaTeq^^[_] Influenza (intramuscular, 6 months and up)^^^^12 months:^^[_] MMR, Prevnar, HepA^^[_] MMRV, Prevnar, HepA^^[_] Influenza (intramuscular)^^^^15-18 months:^^[_] DTaP, Hib, Varicella^^[_] HepA^^[_] Influenza (intramuscular)^^^^4-6 years:^^[_] DTaP, IPV, MMR, Varicella^^[_] DTaP, IPV, MMRV^^[_] HepA^^[_] Influenza (intramuscular)^^[_] Influenza (nasal)^^^^Individual vaccines (use ONLY if not using an order set above):^^^^[_] Pediarix (DTaP-IPV-HepB) [_] Hib [_] Prevnar^^[_] DTaP [_] IPV [_] HepB^^[_] RotaTeq^^[_] Influenza (intramuscular)^^[_] Influenza (nasal)^^[_] MMR [_] HepA^^[_] MMRV [_] Varicella^^[_] Tdap [_] Menactra (MCV4)^^[_] HPV^^[_] Other: _^^^^"
          },
          {
            "ABBREVIATION" : ".PEDvac",
            "CONTENTS" : "PEDIATRIC VACCINE ORDER^^^^Order must be signed by a provider licensed to prescribe.^^^^ORDERING PHYSICIAN: _^^^^[_] Past history of vaccine adverse reactions and contraindications reviewed, documented under the online Allergies list as indicated.^^^^[_] Vaccine counseling performed personally by the physician. (CPT codes 90465-90468 for patients under 8 years old.)^^^^SPECIAL INSTRUCTIONS: _^^^^Administer vaccines:^^^^2, 4, 6 months:^^[_] Pediatrix (DTaP-IPV-HepB), Hib, Prevnar^^[_] RotaTeq^^[_] Influenza (intramuscular, 6 months and up)^^^^12 months:^^[_] MMR, Prevnar, HepA^^[_] MMRV, Prevnar, HepA^^[_] Influenza (intramuscular)^^^^15-18 months:^^[_] DTaP, Hib, Varicella^^[_] HepA^^[_] Influenza (intramuscular)^^^^4-6 years:^^[_] DTaP, IPV, MMR, Varicella^^[_] DTaP, IPV, MMRV^^[_] HepA^^[_] Influenza (intramuscular)^^[_] Influenza (nasal)^^^^Individual vaccines (use ONLY if not using an order set above):^^^^[_] Pediarix (DTaP-IPV-HepB) [_] Hib [_] Prevnar^^[_] DTaP [_] IPV [_] HepB^^[_] RotaTeq^^[_] Influenza (intramuscular)^^[_] Influenza (nasal)^^[_] MMR [_] HepA^^[_] MMRV [_] Varicella^^[_] Tdap [_] Menactra (MCV4)^^[_] HPV^^[_] Other: _^^^^"
          }];//this._cache.slice();
  }

  getSize() {
    return this.size;
  }
}

module.exports = FakeObjectDataListStore;
