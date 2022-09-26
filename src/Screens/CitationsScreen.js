import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'

export default function CitationsScreen ({ navigation, props, route }) {
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ textAlign: 'center', fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>
          Citations
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          CV:
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          van Diepen S, Katz JN, Albert NM, Henry TD, Jacobs AK, Kapur NK, Kilic A, Menon V, Ohman EM,
          Sweitzer NK, Thiele H, Washam JB, Cohen MG; American Heart Association Council on Clinical
          Cardiology; Council on Cardiovascular and Stroke Nursing; Council on Quality of Care and
          Outcomes Research; and Mission: Lifeline. Contemporary Management of Cardiogenic Shock: A
          Scientific Statement From the American Heart Association. Circulation. 2017 Oct
          17;136(16):e232-e268. doi: 10.1161/CIR.0000000000000525. Epub 2017 Sep 18. PMID:
          28923988.{'\n'}{'\n'}

          Marino, L. Paul Md PhD. Marino’s the ICU Book: Print Ebook With Updates (ICU Book (Marino)).
          2022.{'\n'}{'\n'}

          Fink Mitchell, et al. Textbook of Critical Care. 7th ed., Elsevier, 2017.{'\n'}{'\n'}

          Merchant, R. M., Topjian, A. A., Panchal, A. R., Cheng, A., Aziz, K., Berg, K. M., ... &amp; Adult Basic
          and Advanced Life Support, Pediatric Basic and Advanced Life Support, Neonatal Life Support,
          Resuscitation Education Science, and Systems of Care Writing Groups. (2020). Part 1: executive
          summary: 2020 American Heart Association guidelines for cardiopulmonary resuscitation and
          emergency cardiovascular care. Circulation, 142(16_Suppl_2), S337-S357.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Vent:
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Weingart, S. D. (2016). Managing initial mechanical ventilation in the emergency
          department. Annals of emergency medicine, 68(5), 614-617.{'\n'}{'\n'}

          Grasso, S., Stripoli, T., De Michele, M., Bruno, F., Moschetta, M., Angelelli, G., ... &amp; Fiore, T.
          (2007). ARDSnet ventilatory protocol and alveolar hyperinflation: role of positive end-expiratory
          pressure. American journal of respiratory and critical care medicine, 176(8), 761-767.{'\n'}{'\n'}

          Owens, William. The Ventilator Book. First Draught Press, 2021.{'\n'}{'\n'}

          Marino, L. Paul Md PhD. Marino’s the ICU Book: Print Ebook With Updates (ICU Book (Marino)).
          2022.{'\n'}{'\n'}

          Fink Mitchell, et al. Textbook of Critical Care. 7th ed., Elsevier, 2017.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          RSI:
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Stollings JL, Diedrich DA, Oyen LJ, Brown DR. Rapid-sequence intubation: a review of the
          process and considerations when choosing medications. Ann Pharmacother. 2014 Jan;48(1):62-
          76. doi: 10.1177/1060028013510488. Epub 2013 Nov 4. PMID: 24259635.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Antidotes:
        </Text>
          
        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          California Poison Control Antidote Chart:
          https://calpoison.org/sites/pharm.ucsf.edu/files/calpoison/media-browser/cpcs-antidote-
          chart-august-2022.pdf
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Blood:
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Marino, L. Paul Md PhD. Marino’s the ICU Book: Print Ebook With Updates (ICU Book (Marino)).
          2022.{'\n'}{'\n'}

          Fink Mitchell, et al. Textbook of Critical Care. 7th ed., Elsevier, 2017.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Seizure:
        </Text>
          
        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Mason, Jessica, et al. “Status Epilepticus.” EMRAP,
          https://www.emrap.org/episode/c3seizures/seizuresstatus. 
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          OB:
        </Text>
          
        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Bienstock, J. L., Eke, A. C., &amp; Hueppchen, N. A. (2021). Postpartum hemorrhage. New England
          Journal of Medicine, 384(17), 1635-1645.{'\n'}{'\n'}

          Anand Swaminathan, &quot;Post-Partum Hemorrhage&quot;, REBEL EM blog, January 15, 2018. Available
          at: https://rebelem.com/post-partum-hemorrhage/.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Intranasal:
        </Text>
          
        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Rech, MA et al. When to pick the nose: out-of-hospital and emergency department intranasal
          administration of medications. Ann Emerg Med. 2017 May 25. PMID: 28366351
          Bailey AM, Baum RA, Horn K, Lewis T, Morizio K, Schultz A, Weant K, Justice SN. Review of
          Intranasally Administered Medications for Use in the Emergency Department. J Emerg Med.
          2017 Jul;53(1):38-48. doi: 10.1016/j.jemermed.2017.01.020. Epub 2017 Mar 1. PMID:
          28259526.{'\n'}{'\n'}

          Corrigan, M., Wilson, S. S., &amp; Hampton, J. (2015). Safety and efficacy of intranasally
          administered medications in the emergency department and prehospital settings. American
          Journal of Health-System Pharmacy, 72(18), 1544-1554.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Psych:
        </Text>
          
        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Strayer, Reuben. “Emergency Management of the Agitated Patient.” Emupdates, 4 Sept. 2016,
          https://emupdates.com/emergency-management-of-the-agitated-patient/. {'\n'}{'\n'}

          Francis, Joseph. Delirium and acute confusional states: Prevention, treatment, and prognosis.
          In: UpToDate; UpToDate, Waltham, MA. (Accessed on Sept 20, 2022.)
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Local:
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Crystal CS, Blankenship RB. Local anesthetics and peripheral nerve blocks in the
          emergency department. Emerg Med Clin North Am. 2005 May;23(2):477-502. doi:
          10.1016/j.emc.2004.12.012. PMID: 15829393.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          DOAC:
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Chen A, Stecker E, A Warden B. Direct Oral Anticoagulant Use: A Practical Guide to
          Common Clinical Challenges. J Am Heart Assoc. 2020 Jul 7;9(13):e017559. doi:
          10.1161/JAHA.120.017559. Epub 2020 Jun 15. PMID: 32538234; PMCID:
          PMC7670541.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Sedation:
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Devlin JW, Skrobik Y, Gélinas C, Needham DM, Slooter AJC, Pandharipande PP, Watson PL,
          Weinhouse GL, Nunnally ME, Rochwerg B, Balas MC, van den Boogaard M, Bosma KJ, Brummel
          NE, Chanques G, Denehy L, Drouot X, Fraser GL, Harris JE, Joffe AM, Kho ME, Kress JP, Lanphere
          JA, McKinley S, Neufeld KJ, Pisani MA, Payen JF, Pun BT, Puntillo KA, Riker RR, Robinson BRH,
          Shehabi Y, Szumita PM, Winkelman C, Centofanti JE, Price C, Nikayin S, Misak CJ, Flood PD,
          Kiedrowski K, Alhazzani W. Clinical Practice Guidelines for the Prevention and Management of
          Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the
          ICU. Crit Care Med. 2018 Sep;46(9):e825-e873. doi: 10.1097/CCM.0000000000003299. PMID:
          30113379.{'\n'}{'\n'}

          Marino, L. Paul Md PhD. Marino’s the ICU Book: Print Ebook With Updates (ICU Book (Marino)).
          2022.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>
          Trauma:
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Jehan F, Aziz H, OʼKeeffe T, Khan M, Zakaria ER, Hamidi M, Zeeshan M, Kulvatunyou N, Joseph
          B. The role of four-factor prothrombin complex concentrate in coagulopathy of trauma: A
          propensity matched analysis. J Trauma Acute Care Surg. 2018 Jul;85(1):18-24. doi:
          10.1097/TA.0000000000001938. PMID: 29664892.{'\n'}{'\n'}

          Joseph B, Khalil M, Harrison C, Swartz T, Kulvatunyou N, Haider AA, Jokar TO, Burk D, Mahmoud
          A, Latifi R, Rhee P. Assessing the Efficacy of Prothrombin Complex Concentrate in Multiply
          Injured Patients With High-Energy Pelvic and Extremity Fractures. J Orthop Trauma. 2016
          Dec;30(12):653-658. doi: 10.1097/BOT.0000000000000665. PMID: 27875491.{'\n'}{'\n'}

          Roberts I, Shakur H, Coats T, Hunt B, Balogun E, Barnetson L, Cook L, Kawahara T, Perel P,
          Prieto-Merino D, Ramos M, Cairns J, Guerriero C. The CRASH-2 trial: a randomised controlled
          trial and economic evaluation of the effects of tranexamic acid on death, vascular occlusive
          events and transfusion requirement in bleeding trauma patients. Health Technol Assess. 2013
          Mar;17(10):1-79. doi: 10.3310/hta17100. PMID: 23477634; PMCID: PMC4780956.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginTop: 0,
    flex: 1
  },
  title: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 10
  },
  scrollView: {
    marginHorizontal: 20
  },
  SubmitButtonStyle: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    width: 300,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
