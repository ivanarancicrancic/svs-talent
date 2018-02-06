 var Observable = require('FuseJS/Observable');

var DrugsData = [
    {
      "term": "Oxygen",
      "count": 458
    },
    {
      "term": "Ibuprofen",
      "count": 359
    },
    {
      "term": "Gabapentin",
      "count": 239
    },
    {
      "term": "Amoxicillin",
      "count": 197
    },
    {
      "term": "OXYGEN",
      "count": 188
    },
    {
      "term": "Naproxen",
      "count": 151
    },
    {
      "term": "Hydrochlorothiazide",
      "count": 151
    },
    {
      "term": "Metformin Hydrochloride",
      "count": 142
    },
    {
      "term": "Hand Sanitizer",
      "count": 138
    },
    {
      "term": "Metronidazole",
      "count": 129
    },
    {
      "term": "Levetiracetam",
      "count": 128
    },
    {
      "term": "Doxycycline Hyclate",
      "count": 127
    },
    {
      "term": "Lisinopril",
      "count": 126
    },
    {
      "term": "Lorazepam",
      "count": 124
    },
    {
      "term": "Cyclobenzaprine Hydrochloride",
      "count": 123
    },
    {
      "term": "Naproxen Sodium",
      "count": 121
    },
    {
      "term": "Amoxicillin and Clavulanate Potassium",
      "count": 120
    },
    {
      "term": "Omeprazole",
      "count": 118
    },
    {
      "term": "Carvedilol",
      "count": 118
    },
    {
      "term": "Metoprolol Tartrate",
      "count": 117
    },
    {
      "term": "Ciprofloxacin",
      "count": 116
    },
    {
      "term": "Atenolol",
      "count": 116
    },
    {
      "term": "Furosemide",
      "count": 115
    },
    {
      "term": "Cephalexin",
      "count": 115
    },
    {
      "term": "Sulfamethoxazole and Trimethoprim",
      "count": 113
    },
    {
      "term": "Prednisone",
      "count": 111
    },
    {
      "term": "Aspirin",
      "count": 111
    },
    {
      "term": "Alprazolam",
      "count": 109
    },
    {
      "term": "Ranitidine",
      "count": 106
    },
    {
      "term": "Phentermine Hydrochloride",
      "count": 106
    },
    {
      "term": "Methocarbamol",
      "count": 106
    },
    {
      "term": "Diclofenac Sodium",
      "count": 106
    },
    {
      "term": "Bupropion Hydrochloride",
      "count": 104
    },
    {
      "term": "Warfarin Sodium",
      "count": 103
    },
    {
      "term": "Nitrogen",
      "count": 103
    },
    {
      "term": "Potassium Chloride",
      "count": 101
    },
    {
      "term": "Hydrocodone Bitartrate and Acetaminophen",
      "count": 98
    },
    {
      "term": "Famotidine",
      "count": 98
    },
    {
      "term": "Allergy Relief",
      "count": 98
    },
    {
      "term": "Propranolol Hydrochloride",
      "count": 97
    },
    {
      "term": "Diazepam",
      "count": 97
    },
    {
      "term": "Stool Softener",
      "count": 96
    },
    {
      "term": "Levofloxacin",
      "count": 96
    },
    {
      "term": "Losartan Potassium",
      "count": 95
    },
    {
      "term": "Levothyroxine Sodium",
      "count": 95
    },
    {
      "term": "Promethazine Hydrochloride",
      "count": 94
    },
    {
      "term": "Hydrocortisone",
      "count": 94
    },
    {
      "term": "Acyclovir",
      "count": 94
    },
    {
      "term": "Cetirizine Hydrochloride",
      "count": 90
    },
    {
      "term": "Azithromycin",
      "count": 90
    },
    {
      "term": "Fluoxetine",
      "count": 89
    },
    {
      "term": "Amlodipine Besylate",
      "count": 89
    },
    {
      "term": "Mirtazapine",
      "count": 87
    },
    {
      "term": "Acetaminophen",
      "count": 87
    },
    {
      "term": "Lamotrigine",
      "count": 85
    },
    {
      "term": "Ondansetron",
      "count": 83
    },
    {
      "term": "Fluconazole",
      "count": 83
    },
    {
      "term": "Lidocaine Hydrochloride",
      "count": 82
    },
    {
      "term": "Glipizide",
      "count": 82
    },
    {
      "term": "Trazodone Hydrochloride",
      "count": 81
    },
    {
      "term": "Lovastatin",
      "count": 81
    },
    {
      "term": "Hydrogen Peroxide",
      "count": 81
    },
    {
      "term": "ibuprofen",
      "count": 80
    },
    {
      "term": "Ketorolac Tromethamine",
      "count": 80
    },
    {
      "term": "Isopropyl Alcohol",
      "count": 80
    },
    {
      "term": "Venlafaxine Hydrochloride",
      "count": 79
    },
    {
      "term": "Olanzapine",
      "count": 78
    },
    {
      "term": "Lidocaine",
      "count": 78
    },
    {
      "term": "Citalopram",
      "count": 78
    },
    {
      "term": "Topiramate",
      "count": 77
    },
    {
      "term": "Diltiazem Hydrochloride",
      "count": 77
    },
    {
      "term": "Salicylic Acid",
      "count": 75
    },
    {
      "term": "Sertraline Hydrochloride",
      "count": 74
    },
    {
      "term": "Pantoprazole Sodium",
      "count": 74
    },
    {
      "term": "Etodolac",
      "count": 74
    },
    {
      "term": "Paroxetine",
      "count": 73
    },
    {
      "term": "Baclofen",
      "count": 73
    },
    {
      "term": "Simvastatin",
      "count": 72
    },
    {
      "term": "ATORVASTATIN CALCIUM",
      "count": 72
    },
    {
      "term": "Tramadol Hydrochloride",
      "count": 71
    },
    {
      "term": "Nortriptyline Hydrochloride",
      "count": 71
    },
    {
      "term": "Nifedipine",
      "count": 71
    },
    {
      "term": "Indomethacin",
      "count": 71
    },
    {
      "term": "Triamcinolone Acetonide",
      "count": 70
    },
    {
      "term": "Hydralazine Hydrochloride",
      "count": 70
    },
    {
      "term": "Divalproex Sodium",
      "count": 70
    },
    {
      "term": "Clonazepam",
      "count": 70
    },
    {
      "term": "Nystatin",
      "count": 68
    },
    {
      "term": "Loratadine",
      "count": 68
    },
    {
      "term": "Hydroxyzine Hydrochloride",
      "count": 68
    },
    {
      "term": "Amitriptyline Hydrochloride",
      "count": 68
    },
    {
      "term": "Zolpidem Tartrate",
      "count": 67
    },
    {
      "term": "Glyburide",
      "count": 67
    },
    {
      "term": "Glimepiride",
      "count": 67
    },
    {
      "term": "Clonidine Hydrochloride",
      "count": 67
    },
    {
      "term": "Diphenhydramine Hydrochloride",
      "count": 65
    },
    {
      "term": "Benazepril Hydrochloride",
      "count": 65
    },
    {
      "term": "Sodium Chloride",
      "count": 64
    },
    {
      "term": "LISINOPRIL",
      "count": 64
    },
    {
      "term": "Gemfibrozil",
      "count": 64
    },
    {
      "term": "Escitalopram",
      "count": 64
    },
    {
      "term": "Penicillin V Potassium",
      "count": 63
    },
    {
      "term": "Morphine Sulfate",
      "count": 63
    },
    {
      "term": "Spironolactone",
      "count": 62
    },
    {
      "term": "Allopurinol",
      "count": 61
    },
    {
      "term": "Nicotine",
      "count": 60
    },
    {
      "term": "Triamterene and Hydrochlorothiazide",
      "count": 59
    },
    {
      "term": "Estradiol",
      "count": 59
    },
    {
      "term": "Montelukast Sodium",
      "count": 58
    },
    {
      "term": "Gas Relief Extra Strength",
      "count": 58
    },
    {
      "term": "Cefdinir",
      "count": 58
    },
    {
      "term": "Lansoprazole",
      "count": 57
    },
    {
      "term": "Fenofibrate",
      "count": 57
    },
    {
      "term": "Doxycycline",
      "count": 57
    },
    {
      "term": "Verapamil Hydrochloride",
      "count": 56
    },
    {
      "term": "Risperidone",
      "count": 56
    },
    {
      "term": "Nabumetone",
      "count": 56
    },
    {
      "term": "Lithium Carbonate",
      "count": 56
    },
    {
      "term": "HYDROCODONE BITARTRATE AND ACETAMINOPHEN",
      "count": 56
    },
    {
      "term": "Finasteride",
      "count": 56
    },
    {
      "term": "Dicyclomine Hydrochloride",
      "count": 56
    },
    {
      "term": "Antiseptic",
      "count": 56
    },
    {
      "term": "Metoclopramide",
      "count": 55
    },
    {
      "term": "Losartan Potassium and Hydrochlorothiazide",
      "count": 55
    },
    {
      "term": "Folic Acid",
      "count": 55
    },
    {
      "term": "Celecoxib",
      "count": 55
    },
    {
      "term": "Carisoprodol",
      "count": 55
    },
    {
      "term": "Oxycodone Hydrochloride",
      "count": 54
    },
    {
      "term": "Loperamide Hydrochloride",
      "count": 54
    },
    {
      "term": "Fluticasone Propionate",
      "count": 54
    },
    {
      "term": "Dandruff",
      "count": 53
    },
    {
      "term": "Meloxicam",
      "count": 52
    },
    {
      "term": "Clarithromycin",
      "count": 52
    },
    {
      "term": "Phenazopyridine Hydrochloride",
      "count": 51
    },
    {
      "term": "Oxycodone and Acetaminophen",
      "count": 51
    },
    {
      "term": "Oxybutynin Chloride",
      "count": 51
    },
    {
      "term": "Instant Hand Sanitizer",
      "count": 51
    },
    {
      "term": "GABAPENTIN",
      "count": 51
    },
    {
      "term": "Triple Antibiotic",
      "count": 50
    },
    {
      "term": "Antispetic",
      "count": 50
    },
    {
      "term": "Heparin Sodium",
      "count": 48
    },
    {
      "term": "Haloperidol",
      "count": 48
    },
    {
      "term": "Fluocinonide",
      "count": 48
    },
    {
      "term": "Benzonatate",
      "count": 48
    },
    {
      "term": "METFORMIN HYDROCHLORIDE",
      "count": 47
    },
    {
      "term": "Lyrica",
      "count": 47
    },
    {
      "term": "ENALAPRIL MALEATE",
      "count": 47
    },
    {
      "term": "Clindamycin Hydrochloride",
      "count": 47
    },
    {
      "term": "BANANA BOAT",
      "count": 47
    },
    {
      "term": "Witch Hazel",
      "count": 46
    },
    {
      "term": "NITROGEN",
      "count": 46
    },
    {
      "term": "Minocycline Hydrochloride",
      "count": 46
    },
    {
      "term": "Atorvastatin Calcium",
      "count": 46
    },
    {
      "term": "Tamsulosin Hydrochloride",
      "count": 45
    },
    {
      "term": "Metaxalone",
      "count": 45
    },
    {
      "term": "Doxazosin",
      "count": 45
    },
    {
      "term": "simvastatin",
      "count": 44
    },
    {
      "term": "Isoniazid",
      "count": 44
    },
    {
      "term": "Headache Relief Extra Strength",
      "count": 44
    },
    {
      "term": "Clobetasol Propionate",
      "count": 44
    },
    {
      "term": "Citalopram Hydrobromide",
      "count": 44
    },
    {
      "term": "Clotrimazole",
      "count": 43
    },
    {
      "term": "Anticavity",
      "count": 43
    },
    {
      "term": "Pain Relief Extra Strength",
      "count": 42
    },
    {
      "term": "Meclizine Hydrochloride",
      "count": 42
    },
    {
      "term": "Hydrocodone Bitartrate And Acetaminophen",
      "count": 42
    },
    {
      "term": "Carbamazepine",
      "count": 42
    },
    {
      "term": "Acetaminophen and Codeine Phosphate",
      "count": 42
    },
    {
      "term": "TOPIRAMATE",
      "count": 41
    },
    {
      "term": "Ramipril",
      "count": 41
    },
    {
      "term": "Magnesium Citrate",
      "count": 41
    },
    {
      "term": "Ketoconazole",
      "count": 41
    },
    {
      "term": "Donepezil Hydrochloride",
      "count": 41
    },
    {
      "term": "Tizanidine",
      "count": 40
    },
    {
      "term": "Betamethasone Dipropionate",
      "count": 40
    },
    {
      "term": "Valsartan",
      "count": 39
    },
    {
      "term": "TRAMADOL HYDROCHLORIDE",
      "count": 39
    },
    {
      "term": "Ofloxacin",
      "count": 39
    },
    {
      "term": "Nitrous Oxide",
      "count": 39
    },
    {
      "term": "Duloxetine",
      "count": 39
    },
    {
      "term": "Benztropine Mesylate",
      "count": 39
    },
    {
      "term": "meloxicam",
      "count": 38
    },
    {
      "term": "Tolnaftate",
      "count": 38
    },
    {
      "term": "Docusate Sodium",
      "count": 38
    },
    {
      "term": "Buspirone Hydrochloride",
      "count": 38
    },
    {
      "term": "Albuterol Sulfate",
      "count": 38
    },
    {
      "term": "Acid Reducer",
      "count": 38
    },
    {
      "term": "lisinopril",
      "count": 37
    },
    {
      "term": "Erythromycin",
      "count": 37
    },
    {
      "term": "Dexamethasone",
      "count": 37
    },
    {
      "term": "benzonatate",
      "count": 36
    },
    {
      "term": "anti bacterial hand sanitizer",
      "count": 36
    },
    {
      "term": "Hand Wash",
      "count": 36
    },
    {
      "term": "Childrens Ibuprofen",
      "count": 36
    },
    {
      "term": "Bach Original Flower Remedies",
      "count": 36
    },
    {
      "term": "Valsartan and Hydrochlorothiazide",
      "count": 35
    },
    {
      "term": "Valacyclovir Hydrochloride",
      "count": 35
    },
    {
      "term": "Tobramycin",
      "count": 35
    },
    {
      "term": "Pravastatin Sodium",
      "count": 35
    },
    {
      "term": "Mometasone Furoate",
      "count": 35
    },
    {
      "term": "Gentamicin Sulfate",
      "count": 35
    },
    {
      "term": "Dexamethasone Sodium Phosphate",
      "count": 35
    },
    {
      "term": "Cefadroxil",
      "count": 35
    },
    {
      "term": "Air",
      "count": 35
    },
    {
      "term": "Quetiapine fumarate",
      "count": 34
    },
    {
      "term": "Nighttime Sleep Aid",
      "count": 34
    },
    {
      "term": "Lisinopril and Hydrochlorothiazide",
      "count": 34
    },
    {
      "term": "Digoxin",
      "count": 34
    },
    {
      "term": "Clopidogrel",
      "count": 34
    },
    {
      "term": "Allergy",
      "count": 34
    },
    {
      "term": "nicotine",
      "count": 33
    },
    {
      "term": "ZOLPIDEM TARTRATE",
      "count": 33
    },
    {
      "term": "Venlafaxine",
      "count": 33
    },
    {
      "term": "Mineral Oil",
      "count": 33
    },
    {
      "term": "Glycopyrrolate",
      "count": 33
    },
    {
      "term": "Bacitracin",
      "count": 33
    },
    {
      "term": "ADSOL Red Cell Preservation Solution System in Plastic Container (PL 146 Plastic)",
      "count": 33
    },
    {
      "term": "hemorrhoidal",
      "count": 32
    },
    {
      "term": "antacid",
      "count": 32
    },
    {
      "term": "Tramadol Hydrochloride and Acetaminophen",
      "count": 32
    },
    {
      "term": "Isosorbide Dinitrate",
      "count": 32
    },
    {
      "term": "Hemorrhoidal",
      "count": 32
    },
    {
      "term": "Epsom Salt",
      "count": 32
    },
    {
      "term": "Diphenoxylate Hydrochloride and Atropine Sulfate",
      "count": 32
    },
    {
      "term": "Bumetanide",
      "count": 32
    },
    {
      "term": "Anastrozole",
      "count": 32
    },
    {
      "term": "Alcohol Prep Pad",
      "count": 32
    },
    {
      "term": "citroma",
      "count": 31
    },
    {
      "term": "Temazepam",
      "count": 31
    },
    {
      "term": "Sleep Aid",
      "count": 31
    },
    {
      "term": "Orphenadrine Citrate",
      "count": 31
    },
    {
      "term": "Miconazole Nitrate",
      "count": 31
    },
    {
      "term": "Metoprolol succinate",
      "count": 31
    },
    {
      "term": "Ursodiol",
      "count": 30
    },
    {
      "term": "Sucralfate",
      "count": 30
    },
    {
      "term": "Rifampin",
      "count": 30
    },
    {
      "term": "Pain Relief",
      "count": 30
    },
    {
      "term": "ONDANSETRON",
      "count": 30
    },
    {
      "term": "Metformin hydrochloride",
      "count": 30
    },
    {
      "term": "Doxepin Hydrochloride",
      "count": 30
    },
    {
      "term": "Amlodipine Besylate and Benazepril Hydrochloride",
      "count": 30
    },
    {
      "term": "All Day Pain Relief",
      "count": 30
    },
    {
      "term": "Quetiapine Fumarate",
      "count": 29
    },
    {
      "term": "PredniSONE",
      "count": 29
    },
    {
      "term": "Neomycin and Polymyxin B Sulfates and Hydrocortisone",
      "count": 29
    },
    {
      "term": "Metoprolol Succinate",
      "count": 29
    },
    {
      "term": "Methylphenidate Hydrochloride",
      "count": 29
    },
    {
      "term": "Fexofenadine Hydrochloride",
      "count": 29
    },
    {
      "term": "Childrens Allergy",
      "count": 29
    },
    {
      "term": "Anticavity Fluoride Rinse",
      "count": 29
    },
    {
      "term": "Ampicillin",
      "count": 29
    },
    {
      "term": "cephalexin",
      "count": 28
    },
    {
      "term": "Sildenafil",
      "count": 28
    },
    {
      "term": "Prochlorperazine Maleate",
      "count": 28
    },
    {
      "term": "Ondansetron Hydrochloride",
      "count": 28
    },
    {
      "term": "Milk of Magnesia",
      "count": 28
    },
    {
      "term": "Hydroxychloroquine Sulfate",
      "count": 28
    },
    {
      "term": "Eszopiclone",
      "count": 28
    },
    {
      "term": "Enalapril Maleate",
      "count": 28
    },
    {
      "term": "Antiseptic Mouth Rinse",
      "count": 28
    },
    {
      "term": "instant hand sanitizer",
      "count": 27
    },
    {
      "term": "ciprofloxacin",
      "count": 27
    },
    {
      "term": "Tartar control plus",
      "count": 27
    },
    {
      "term": "Megestrol Acetate",
      "count": 27
    },
    {
      "term": "Desmopressin Acetate",
      "count": 27
    },
    {
      "term": "Cefazolin",
      "count": 27
    },
    {
      "term": "Antibacterial Hand Sanitizer",
      "count": 27
    },
    {
      "term": "Antacid",
      "count": 27
    },
    {
      "term": "Alendronate Sodium",
      "count": 27
    },
    {
      "term": "isosorbide mononitrate",
      "count": 26
    },
    {
      "term": "allergy relief",
      "count": 26
    },
    {
      "term": "Vancomycin Hydrochloride",
      "count": 26
    },
    {
      "term": "Terbinafine Hydrochloride",
      "count": 26
    },
    {
      "term": "Sodium Bicarbonate",
      "count": 26
    },
    {
      "term": "Rosuvastatin Calcium",
      "count": 26
    },
    {
      "term": "Phendimetrazine Tartrate",
      "count": 26
    },
    {
      "term": "Pain Relief PM Extra Strength",
      "count": 26
    },
    {
      "term": "OXYCODONE HYDROCHLORIDE",
      "count": 26
    },
    {
      "term": "HAND SANITIZER",
      "count": 26
    },
    {
      "term": "Glipizide ER",
      "count": 26
    },
    {
      "term": "Captopril",
      "count": 26
    },
    {
      "term": "Calcium Acetate",
      "count": 26
    },
    {
      "term": "CELEBREX",
      "count": 26
    },
    {
      "term": "Aspirin Low Dose",
      "count": 26
    },
    {
      "term": "Tacrolimus",
      "count": 25
    },
    {
      "term": "Prazosin Hydrochloride",
      "count": 25
    },
    {
      "term": "Pain Reliever Extra Strength",
      "count": 25
    },
    {
      "term": "Irbesartan",
      "count": 25
    },
    {
      "term": "Ipratropium Bromide",
      "count": 25
    },
    {
      "term": "Ergocalciferol",
      "count": 25
    },
    {
      "term": "Childrens Allergy Relief",
      "count": 25
    },
    {
      "term": "CPDA-1",
      "count": 25
    },
    {
      "term": "Bacitracin Zinc",
      "count": 25
    },
    {
      "term": "Advanced Hand Sanitizer",
      "count": 25
    },
    {
      "term": "ziprasidone hydrochloride",
      "count": 24
    },
    {
      "term": "acyclovir",
      "count": 24
    },
    {
      "term": "SudoGest",
      "count": 24
    },
    {
      "term": "Mupirocin",
      "count": 24
    },
    {
      "term": "Methotrexate",
      "count": 24
    },
    {
      "term": "Imipramine Hydrochloride",
      "count": 24
    },
    {
      "term": "Hydroxyzine Pamoate",
      "count": 24
    },
    {
      "term": "AMITRIPTYLINE HYDROCHLORIDE",
      "count": 24
    },
    {
      "term": "pain relief",
      "count": 23
    },
    {
      "term": "Trihexyphenidyl Hydrochloride",
      "count": 23
    },
    {
      "term": "Terazosin",
      "count": 23
    },
    {
      "term": "Sumatriptan Succinate",
      "count": 23
    },
    {
      "term": "Sotalol Hydrochloride",
      "count": 23
    },
    {
      "term": "Rizatriptan Benzoate",
      "count": 23
    },
    {
      "term": "Pramipexole Dihydrochloride",
      "count": 23
    },
    {
      "term": "Piroxicam",
      "count": 23
    },
    {
      "term": "Phenytoin Sodium",
      "count": 23
    },
    {
      "term": "Methylprednisolone",
      "count": 23
    },
    {
      "term": "Honey Lemon Cough Drop",
      "count": 23
    },
    {
      "term": "Fentanyl Citrate",
      "count": 23
    },
    {
      "term": "Dextrose",
      "count": 23
    },
    {
      "term": "Desoximetasone",
      "count": 23
    },
    {
      "term": "Clindamycin hydrochloride",
      "count": 23
    },
    {
      "term": "Carbon Dioxide",
      "count": 23
    },
    {
      "term": "Carbidopa and Levodopa",
      "count": 23
    },
    {
      "term": "Budesonide",
      "count": 23
    },
    {
      "term": "Anti-Diarrheal",
      "count": 23
    },
    {
      "term": "Amiodarone Hydrochloride",
      "count": 23
    },
    {
      "term": "Acetaminophen Extra Strength",
      "count": 23
    },
    {
      "term": "Tretinoin",
      "count": 22
    },
    {
      "term": "Sore Throat",
      "count": 22
    },
    {
      "term": "Oxcarbazepine",
      "count": 22
    },
    {
      "term": "Hyoscyamine Sulfate",
      "count": 22
    },
    {
      "term": "Fluocinolone Acetonide",
      "count": 22
    },
    {
      "term": "Felodipine",
      "count": 22
    },
    {
      "term": "Butalbital, Acetaminophen and Caffeine",
      "count": 22
    },
    {
      "term": "Zidovudine",
      "count": 21
    },
    {
      "term": "Torsemide",
      "count": 21
    },
    {
      "term": "Stool Softener Plus Stimulant Laxative",
      "count": 21
    },
    {
      "term": "Stay Awake",
      "count": 21
    },
    {
      "term": "PROMETHAZINE HYDROCHLORIDE",
      "count": 21
    },
    {
      "term": "Mucus Relief",
      "count": 21
    },
    {
      "term": "Medroxyprogesterone Acetate",
      "count": 21
    },
    {
      "term": "IBUPROFEN",
      "count": 21
    },
    {
      "term": "Fentanyl",
      "count": 21
    },
    {
      "term": "Ceftriaxone",
      "count": 21
    },
    {
      "term": "CLONIDINE HYDROCHLORIDE",
      "count": 21
    },
    {
      "term": "Body",
      "count": 21
    },
    {
      "term": "Antibacterial",
      "count": 21
    },
    {
      "term": "triple antibiotic",
      "count": 20
    },
    {
      "term": "hydroxyzine pamoate",
      "count": 20
    },
    {
      "term": "honey lemon cough drops",
      "count": 20
    },
    {
      "term": "Zonisamide",
      "count": 20
    },
    {
      "term": "Theophylline",
      "count": 20
    },
    {
      "term": "Synthroid",
      "count": 20
    },
    {
      "term": "Sterile Water",
      "count": 20
    },
    {
      "term": "Perphenazine",
      "count": 20
    },
    {
      "term": "Magnesium Sulfate",
      "count": 20
    },
    {
      "term": "Glyburide and Metformin Hydrochloride",
      "count": 20
    },
    {
      "term": "ESZOPICLONE",
      "count": 20
    },
    {
      "term": "Cilostazol",
      "count": 20
    },
    {
      "term": "Ciclopirox",
      "count": 20
    },
    {
      "term": "Amantadine Hydrochloride",
      "count": 20
    },
    {
      "term": "Acetaminophen And Codeine",
      "count": 20
    },
    {
      "term": "AMOXICILLIN",
      "count": 20
    },
    {
      "term": "verapamil hydrochloride",
      "count": 19
    },
    {
      "term": "risperidone",
      "count": 19
    },
    {
      "term": "clonidine hydrochloride",
      "count": 19
    },
    {
      "term": "cherry cough drops",
      "count": 19
    },
    {
      "term": "Xylocaine",
      "count": 19
    },
    {
      "term": "Viagra",
      "count": 19
    },
    {
      "term": "Valproic Acid",
      "count": 19
    },
    {
      "term": "PRAVASTATIN SODIUM",
      "count": 19
    },
    {
      "term": "Miconazole 7",
      "count": 19
    },
    {
      "term": "Memantine Hydrochloride",
      "count": 19
    },
    {
      "term": "Laxative Pills Maximum Strength",
      "count": 19
    },
    {
      "term": "Hydromorphone HCl",
      "count": 19
    },
    {
      "term": "FENOFIBRATE",
      "count": 19
    },
    {
      "term": "Cymbalta",
      "count": 19
    },
    {
      "term": "Clotrimazole and Betamethasone Dipropionate",
      "count": 19
    },
    {
      "term": "Cimetidine",
      "count": 19
    },
    {
      "term": "Ampicillin and Sulbactam",
      "count": 19
    },
    {
      "term": "temazepam",
      "count": 18
    },
    {
      "term": "lansoprazole",
      "count": 18
    },
    {
      "term": "aspirin",
      "count": 18
    },
    {
      "term": "all day relief",
      "count": 18
    },
    {
      "term": "Zoledronic Acid",
      "count": 18
    },
    {
      "term": "Tranexamic Acid",
      "count": 18
    },
    {
      "term": "Tamoxifen Citrate",
      "count": 18
    },
    {
      "term": "Sulindac",
      "count": 18
    },
    {
      "term": "Sulfasalazine",
      "count": 18
    },
    {
      "term": "Sulfacetamide Sodium",
      "count": 18
    },
    {
      "term": "Stomach Relief",
      "count": 18
    },
    {
      "term": "Sore Throat Cherry",
      "count": 18
    },
    {
      "term": "Sleep Aid Maximum Strength",
      "count": 18
    },
    {
      "term": "Sertraline",
      "count": 18
    },
    {
      "term": "Primidone",
      "count": 18
    },
    {
      "term": "Petroleum",
      "count": 18
    },
    {
      "term": "PAROXETINE",
      "count": 18
    },
    {
      "term": "Naloxone Hydrochloride",
      "count": 18
    },
    {
      "term": "Modafinil",
      "count": 18
    },
    {
      "term": "Midazolam Hydrochloride",
      "count": 18
    },
    {
      "term": "HYDROXYZINE PAMOATE",
      "count": 18
    },
    {
      "term": "HYDROCORTISONE",
      "count": 18
    },
    {
      "term": "Dicloxacillin Sodium",
      "count": 18
    },
    {
      "term": "Cold Spot Point Relief",
      "count": 18
    },
    {
      "term": "Childrens Acetaminophen",
      "count": 18
    },
    {
      "term": "Ceftriaxone Sodium",
      "count": 18
    },
    {
      "term": "Bupropion hydrochloride",
      "count": 18
    },
    {
      "term": "Aripiprazole",
      "count": 18
    },
    {
      "term": "AZITHROMYCIN",
      "count": 18
    },
    {
      "term": "ANTIBACTERIAL FOAMING",
      "count": 18
    },
    {
      "term": "ABILIFY",
      "count": 18
    },
    {
      "term": "triamcinolone acetonide",
      "count": 17
    },
    {
      "term": "topiramate",
      "count": 17
    },
    {
      "term": "pain relief extra strength",
      "count": 17
    },
    {
      "term": "fexofenadine hydrochloride",
      "count": 17
    },
    {
      "term": "azithromycin",
      "count": 17
    },
    {
      "term": "Zicam",
      "count": 17
    },
    {
      "term": "Waterless Anti-Bacterial Hand Cleanser",
      "count": 17
    },
    {
      "term": "Senna S",
      "count": 17
    },
    {
      "term": "SERTRALINE HYDROCHLORIDE",
      "count": 17
    },
    {
      "term": "Peptic Relief",
      "count": 17
    },
    {
      "term": "Pain Reliever PM Extra Strength",
      "count": 17
    },
    {
      "term": "Nicardipine Hydrochloride",
      "count": 17
    },
    {
      "term": "Motion Sickness Relief",
      "count": 17
    },
    {
      "term": "Lamivudine",
      "count": 17
    },
    {
      "term": "Labetalol Hydrochloride",
      "count": 17
    },
    {
      "term": "Ketoprofen",
      "count": 17
    },
    {
      "term": "Gelato APF",
      "count": 17
    },
    {
      "term": "Flecainide Acetate",
      "count": 17
    },
    {
      "term": "Entacapone",
      "count": 17
    },
    {
      "term": "Ecolab",
      "count": 17
    },
    {
      "term": "Diclofenac Potassium",
      "count": 17
    },
    {
      "term": "Chlorpromazine Hydrochloride",
      "count": 17
    },
    {
      "term": "Chlorhexidine Gluconate",
      "count": 17
    },
    {
      "term": "Chlordiazepoxide Hydrochloride",
      "count": 17
    },
    {
      "term": "Childrens Pain Relief",
      "count": 17
    },
    {
      "term": "Buspirone HCl",
      "count": 17
    },
    {
      "term": "Alcohol",
      "count": 17
    },
    {
      "term": "Acetazolamide",
      "count": 17
    },
    {
      "term": "pravastatin sodium",
      "count": 16
    },
    {
      "term": "oxygen",
      "count": 16
    },
    {
      "term": "omeprazole",
      "count": 16
    },
    {
      "term": "Top Quality Mfg APF",
      "count": 16
    },
    {
      "term": "Testosterone",
      "count": 16
    },
    {
      "term": "Terazosin Hydrochloride",
      "count": 16
    },
    {
      "term": "Sumatriptan",
      "count": 16
    },
    {
      "term": "Stomach Relief Regular Strength",
      "count": 16
    },
    {
      "term": "Salsalate",
      "count": 16
    },
    {
      "term": "RISPERIDONE",
      "count": 16
    },
    {
      "term": "Quinapril",
      "count": 16
    },
    {
      "term": "Quetiapine",
      "count": 16
    },
    {
      "term": "Prednisolone Sodium Phosphate",
      "count": 16
    },
    {
      "term": "Phenobarbital",
      "count": 16
    },
    {
      "term": "Neomycin and Polymyxin B Sulfates and Dexamethasone",
      "count": 16
    },
    {
      "term": "Moisturizing Antibacterial",
      "count": 16
    },
    {
      "term": "Minoxidil",
      "count": 16
    },
    {
      "term": "Metoclopramide Hydrochloride",
      "count": 16
    },
    {
      "term": "Methimazole",
      "count": 16
    },
    {
      "term": "METOPROLOL SUCCINATE",
      "count": 16
    },
    {
      "term": "Lisinopril with Hydrochlorothiazide",
      "count": 16
    },
    {
      "term": "Linezolid",
      "count": 16
    },
    {
      "term": "Levocetirizine Dihydrochloride",
      "count": 16
    },
    {
      "term": "Isosorbide Mononitrate",
      "count": 16
    },
    {
      "term": "IBU",
      "count": 16
    },
    {
      "term": "Hawaiian Tropic",
      "count": 16
    },
    {
      "term": "Fluorouracil",
      "count": 16
    },
    {
      "term": "Everyday Clean Dandruff",
      "count": 16
    },
    {
      "term": "Epinephrine",
      "count": 16
    },
    {
      "term": "Diaper Rash",
      "count": 16
    },
    {
      "term": "Cough DM",
      "count": 16
    },
    {
      "term": "Cefuroxime Axetil",
      "count": 16
    },
    {
      "term": "Calcitriol",
      "count": 16
    },
    {
      "term": "Calamine",
      "count": 16
    },
    {
      "term": "CRESTOR",
      "count": 16
    },
    {
      "term": "Butalbital, Acetaminophen, and Caffeine",
      "count": 16
    },
    {
      "term": "Banana Boat",
      "count": 16
    },
    {
      "term": "ANTI BACTERIAL HAND SANITIZER",
      "count": 16
    },
    {
      "term": "AMLODIPINE BESYLATE",
      "count": 16
    },
    {
      "term": "milk of magnesia",
      "count": 15
    },
    {
      "term": "anti-bacterial hand gel",
      "count": 15
    },
    {
      "term": "VENLAFAXINE HYDROCHLORIDE",
      "count": 15
    },
    {
      "term": "Triamcinolone acetonide",
      "count": 15
    },
    {
      "term": "Timolol Maleate",
      "count": 15
    },
    {
      "term": "Tetracycline Hydrochloride",
      "count": 15
    },
    {
      "term": "Sodium Fluoride F 18",
      "count": 15
    },
    {
      "term": "Silver Sulfadiazine",
      "count": 15
    },
    {
      "term": "RANITIDINE",
      "count": 15
    },
    {
      "term": "Pioglitazone Hydrochloride",
      "count": 15
    },
    {
      "term": "Pentoxifylline",
      "count": 15
    },
    {
      "term": "PROCHLORPERAZINE MALEATE",
      "count": 15
    },
    {
      "term": "Oxytocin",
      "count": 15
    },
    {
      "term": "Oxaprozin",
      "count": 15
    },
    {
      "term": "Nizatidine",
      "count": 15
    },
    {
      "term": "Nevirapine",
      "count": 15
    },
    {
      "term": "Menthol Cough Drop",
      "count": 15
    },
    {
      "term": "Losortan Potassium",
      "count": 15
    },
    {
      "term": "Lamivudine and Zidovudine",
      "count": 15
    },
    {
      "term": "LAMOTRIGINE",
      "count": 15
    },
    {
      "term": "INDOMETHACIN",
      "count": 15
    },
    {
      "term": "FLUOXETINE",
      "count": 15
    },
    {
      "term": "Childrens Pain and Fever",
      "count": 15
    },
    {
      "term": "Cherry Cough Drop",
      "count": 15
    },
    {
      "term": "Betamethasone Valerate",
      "count": 15
    },
    {
      "term": "Anti-Bacterial Hand Gel",
      "count": 15
    },
    {
      "term": "ACETAMINOPHEN",
      "count": 15
    },
    {
      "term": "voriconazole",
      "count": 14
    },
    {
      "term": "pain relief childrens",
      "count": 14
    },
    {
      "term": "ondansetron",
      "count": 14
    },
    {
      "term": "menthol cough drops",
      "count": 14
    },
    {
      "term": "Zolmitriptan",
      "count": 14
    },
    {
      "term": "Ziprasidone Hydrochloride",
      "count": 14
    },
    {
      "term": "Voriconazole",
      "count": 14
    },
    {
      "term": "Valacyclovir hydrochloride",
      "count": 14
    },
    {
      "term": "Valacyclovir",
      "count": 14
    },
    {
      "term": "VENTOLIN HFA",
      "count": 14
    },
    {
      "term": "Ropinirole Hydrochloride",
      "count": 14
    },
    {
      "term": "Rivastigmine Tartrate",
      "count": 14
    },
    {
      "term": "Progesterone",
      "count": 14
    },
    {
      "term": "Pravastatin sodium",
      "count": 14
    },
    {
      "term": "Povidone Iodine",
      "count": 14
    },
    {
      "term": "PANTOPRAZOLE SODIUM",
      "count": 14
    },
    {
      "term": "OXYCODONE AND ACETAMINOPHEN",
      "count": 14
    },
    {
      "term": "Nasal Decongestant",
      "count": 14
    },
    {
      "term": "Nadolol",
      "count": 14
    },
    {
      "term": "Mucus Relief DM",
      "count": 14
    },
    {
      "term": "Levothyroxine sodium",
      "count": 14
    },
    {
      "term": "LISINOPRIL AND HYDROCHLOROTHIAZIDE",
      "count": 14
    },
    {
      "term": "Hydromorphone Hydrochloride",
      "count": 14
    },
    {
      "term": "Hydrogen Peroxide 3 Percent",
      "count": 14
    },
    {
      "term": "Helium",
      "count": 14
    },
    {
      "term": "Fosinopril Sodium",
      "count": 14
    },
    {
      "term": "Fluoxetine Hydrochloride",
      "count": 14
    },
    {
      "term": "Blueberry Scented Hand Sanitizer",
      "count": 14
    },
    {
      "term": "Atenolol and Chlorthalidone",
      "count": 14
    },
    {
      "term": "ASPIRIN",
      "count": 14
    },
    {
      "term": "ibuprofen pm",
      "count": 13
    },
    {
      "term": "azithromycin monohydrate",
      "count": 13
    },
    {
      "term": "ZONISAMIDE",
      "count": 13
    },
    {
      "term": "Vitamin A D",
      "count": 13
    },
    {
      "term": "VITAMIN D",
      "count": 13
    },
    {
      "term": "Tolterodine Tartrate",
      "count": 13
    },
    {
      "term": "Therapeutic",
      "count": 13
    },
    {
      "term": "Testosterone Cypionate",
      "count": 13
    },
    {
      "term": "Strattera",
      "count": 13
    },
    {
      "term": "SILICEA",
      "count": 13
    },
    {
      "term": "SEROQUEL",
      "count": 13
    },
    {
      "term": "Piperacillin and Tazobactam",
      "count": 13
    },
    {
      "term": "Phenytoin",
      "count": 13
    },
    {
      "term": "Petroleum Skin Protectant",
      "count": 13
    },
    {
      "term": "Pain Relief PM",
      "count": 13
    },
    {
      "term": "Nitrofurantoin Monohydrate/ Macrocrystalline",
      "count": 13
    },
    {
      "term": "NEXIUM",
      "count": 13
    },
    {
      "term": "Mucus Relief Severe Congestion and Cough Maximum Strength",
      "count": 13
    },
    {
      "term": "Mucinex",
      "count": 13
    },
    {
      "term": "Motion Sickness",
      "count": 13
    },
    {
      "term": "Irbesartan and Hydrochlorothiazide",
      "count": 13
    },
    {
      "term": "Hand Sanitizer with Aloe",
      "count": 13
    },
    {
      "term": "HAWAIIAN Tropic",
      "count": 13
    },
    {
      "term": "Glipizide and Metformin Hydrochloride",
      "count": 13
    },
    {
      "term": "Fluphenazine Hydrochloride",
      "count": 13
    },
    {
      "term": "Fexofenadine hydrochloride",
      "count": 13
    },
    {
      "term": "Famciclovir",
      "count": 13
    },
    {
      "term": "Diovan",
      "count": 13
    },
    {
      "term": "Clorazepate Dipotassium",
      "count": 13
    },
    {
      "term": "Buspirone hydrochloride",
      "count": 13
    },
    {
      "term": "Bisacodyl",
      "count": 13
    },
    {
      "term": "Athletes Foot",
      "count": 13
    },
    {
      "term": "Aspirin Low Dose Safety Coated",
      "count": 13
    },
    {
      "term": "Ammonia N 13",
      "count": 13
    },
    {
      "term": "Amlodipine and Benazepril Hydrochloride",
      "count": 13
    },
    {
      "term": "All Day Allergy",
      "count": 13
    },
    {
      "term": "Alcohol Prep",
      "count": 13
    },
    {
      "term": "70%",
      "count": 13
    },
    {
      "term": "venlafaxine hydrochloride",
      "count": 12
    },
    {
      "term": "tizanidine",
      "count": 12
    },
    {
      "term": "ropinirole hydrochloride",
      "count": 12
    },
    {
      "term": "nifedipine",
      "count": 12
    },
    {
      "term": "naproxen sodium",
      "count": 12
    },
    {
      "term": "miconazole 1",
      "count": 12
    },
    {
      "term": "ibuprofen childrens",
      "count": 12
    },
    {
      "term": "hydrochlorothiazide",
      "count": 12
    },
    {
      "term": "enema",
      "count": 12
    },
    {
      "term": "citalopram hydrobromide",
      "count": 12
    },
    {
      "term": "anti-bacterial hand sanitizer",
      "count": 12
    },
    {
      "term": "allergy",
      "count": 12
    },
    {
      "term": "Womens Laxative",
      "count": 12
    },
    {
      "term": "Wet Wipes",
      "count": 12
    },
    {
      "term": "Tussin DM",
      "count": 12
    },
    {
      "term": "Triamterene hydrochlorothiazide",
      "count": 12
    },
    {
      "term": "Stomach Relief Maximum Strength",
      "count": 12
    },
    {
      "term": "Ranitidine Hydrochloride",
      "count": 12
    },
    {
      "term": "Rabeprazole Sodium",
      "count": 12
    },
    {
      "term": "Propafenone Hydrochloride",
      "count": 12
    },
    {
      "term": "Primo APF",
      "count": 12
    },
    {
      "term": "Pioglitazone",
      "count": 12
    },
    {
      "term": "Paricalcitol",
      "count": 12
    },
    {
      "term": "Nasal",
      "count": 12
    },
    {
      "term": "Naltrexone Hydrochloride",
      "count": 12
    },
    {
      "term": "NITROUS OXIDE",
      "count": 12
    },
    {
      "term": "NAPROXEN",
      "count": 12
    },
    {
      "term": "Midazolam",
      "count": 12
    },
    {
      "term": "Methadone Hydrochloride",
      "count": 12
    },
    {
      "term": "MS APF",
      "count": 12
    },
    {
      "term": "Lunesta",
      "count": 12
    },
    {
      "term": "Lipitor",
      "count": 12
    },
    {
      "term": "Lactulose",
      "count": 12
    },
    {
      "term": "LEVAQUIN",
      "count": 12
    },
    {
      "term": "Hand wash",
      "count": 12
    },
    {
      "term": "Gentle Laxative",
      "count": 12
    },
    {
      "term": "Gas Relief",
      "count": 12
    },
    {
      "term": "Flumazenil",
      "count": 12
    },
    {
      "term": "Daily Moisturizing",
      "count": 12
    },
    {
      "term": "Cyproheptadine Hydrochloride",
      "count": 12
    },
    {
      "term": "Chlorzoxazone",
      "count": 12
    },
    {
      "term": "CYCLOBENZAPRINE HYDROCHLORIDE",
      "count": 12
    },
    {
      "term": "CARISOPRODOL",
      "count": 12
    },
    {
      "term": "Burkhart",
      "count": 12
    },
    {
      "term": "Bicalutamide",
      "count": 12
    },
    {
      "term": "Bethanechol Chloride",
      "count": 12
    },
    {
      "term": "Atropine Sulfate",
      "count": 12
    },
    {
      "term": "Adenosine",
      "count": 12
    },
    {
      "term": "Acetaminophen and Codeine",
      "count": 12
    },
    {
      "term": "APIS MELLIFICA",
      "count": 12
    },
    {
      "term": "tramadol hydrochloride",
      "count": 11
    },
    {
      "term": "tizanidine hydrochloride",
      "count": 11
    },
    {
      "term": "nasal",
      "count": 11
    },
    {
      "term": "hydrocortisone",
      "count": 11
    },
    {
      "term": "anti diarrheal",
      "count": 11
    },
    {
      "term": "amlodipine besylate",
      "count": 11
    },
    {
      "term": "acid reducer",
      "count": 11
    },
    {
      "term": "ZALEPLON",
      "count": 11
    },
    {
      "term": "Voltaren",
      "count": 11
    },
    {
      "term": "Urea",
      "count": 11
    },
    {
      "term": "Undecylenic Acid",
      "count": 11
    },
    {
      "term": "Tussin CF",
      "count": 11
    },
    {
      "term": "Trimethobenzamide Hydrochloride",
      "count": 11
    },
    {
      "term": "Terbutaline Sulfate",
      "count": 11
    },
    {
      "term": "Telmisartan",
      "count": 11
    },
    {
      "term": "TAMSULOSIN HYDROCHLORIDE",
      "count": 11
    },
    {
      "term": "STOOL SOFTENER",
      "count": 11
    },
    {
      "term": "Pseudoephedrine Hydrochloride",
      "count": 11
    },
    {
      "term": "Oxacillin",
      "count": 11
    },
    {
      "term": "Omeprazole Magnesium",
      "count": 11
    },
    {
      "term": "Nystatin and Triamcinolone Acetonide",
      "count": 11
    },
    {
      "term": "Nitrofurantoin Macrocrystals",
      "count": 11
    },
    {
      "term": "Mycophenolate Mofetil",
      "count": 11
    },
    {
      "term": "Menthol cough drop",
      "count": 11
    },
    {
      "term": "MECLIZINE HYDROCHLORIDE",
      "count": 11
    },
    {
      "term": "Laxative",
      "count": 11
    },
    {
      "term": "LEVETIRACETAM",
      "count": 11
    },
    {
      "term": "Ibuprofen and Pseudoephedrine Hydrochloride",
      "count": 11
    },
    {
      "term": "FERROUS SULFATE",
      "count": 11
    },
    {
      "term": "Extra Strength Pain Relief",
      "count": 11
    },
    {
      "term": "Donnatal",
      "count": 11
    },
    {
      "term": "Dicyclomine",
      "count": 11
    },
    {
      "term": "Desipramine Hydrochloride",
      "count": 11
    },
    {
      "term": "DULOXETINE DELAYED-RELEASE",
      "count": 11
    },
    {
      "term": "Cough and Cold HBP",
      "count": 11
    },
    {
      "term": "Chlorthalidone",
      "count": 11
    },
    {
      "term": "Cefprozil",
      "count": 11
    },
    {
      "term": "CARBAMAZEPINE",
      "count": 11
    },
    {
      "term": "BENZTROPINE MESYLATE",
      "count": 11
    },
    {
      "term": "Australian Gold Broad Spectrum SPF 30",
      "count": 11
    },
    {
      "term": "Assured Instant",
      "count": 11
    },
    {
      "term": "Antifungal",
      "count": 11
    },
    {
      "term": "Acetaminophen PM Extra Strength",
      "count": 11
    },
    {
      "term": "stool softener",
      "count": 10
    },
    {
      "term": "povidine iodine",
      "count": 10
    },
    {
      "term": "mupirocin",
      "count": 10
    },
    {
      "term": "menthol cough drop",
      "count": 10
    },
    {
      "term": "medroxyprogesterone acetate",
      "count": 10
    },
    {
      "term": "loperamide hydrochloride",
      "count": 10
    },
    {
      "term": "good sense antacid",
      "count": 10
    },
    {
      "term": "buprenorphine hydrochloride",
      "count": 10
    },
    {
      "term": "Zyprexa",
      "count": 10
    },
    {
      "term": "Zetia",
      "count": 10
    },
    {
      "term": "Vitamin A and D",
      "count": 10
    },
    {
      "term": "Vaporizing Chest Rub",
      "count": 10
    },
    {
      "term": "VALTREX",
      "count": 10
    },
    {
      "term": "Truvada",
      "count": 10
    },
    {
      "term": "Trifluoperazine Hydrochloride",
      "count": 10
    },
    {
      "term": "Tobramycin and Dexamethasone",
      "count": 10
    },
    {
      "term": "Temozolomide",
      "count": 10
    },
    {
      "term": "TOPROL XL",
      "count": 10
    },
    {
      "term": "Sunscreen",
      "count": 10
    },
    {
      "term": "Sunmark Nicotine",
      "count": 10
    },
    {
      "term": "Spatherapy",
      "count": 10
    },
    {
      "term": "Sodium Polystyrene Sulfonate",
      "count": 10
    },
    {
      "term": "Simethicone",
      "count": 10
    },
    {
      "term": "Probenecid",
      "count": 10
    },
    {
      "term": "Pepto-Bismol",
      "count": 10
    },
    {
      "term": "PREDNISONE",
      "count": 10
    },
    {
      "term": "Oxaliplatin",
      "count": 10
    },
    {
      "term": "No7 Stay Perfect Foundation Sunscreen Broad Spectrum SPF 15 Deeply Beige",
      "count": 10
    },
    {
      "term": "Nitrofurantion Macrocrystals",
      "count": 10
    },
    {
      "term": "Mucinex DM",
      "count": 10
    },
    {
      "term": "Loratadine and Pseudoephedrine Sulfate",
      "count": 10
    },
    {
      "term": "Lisinopril and hydrochlorothiazide",
      "count": 10
    },
    {
      "term": "Lidocaine and Prilocaine",
      "count": 10
    },
    {
      "term": "Letrozole",
      "count": 10
    },
    {
      "term": "KETOROLAC TROMETHAMINE",
      "count": 10
    },
    {
      "term": "Headache",
      "count": 10
    },
    {
      "term": "Guanfacine",
      "count": 10
    },
    {
      "term": "Guaifenesin",
      "count": 10
    },
    {
      "term": "Fludeoxyglucose F 18",
      "count": 10
    },
    {
      "term": "FIDELIS APF",
      "count": 10
    },
    {
      "term": "ERY-TAB",
      "count": 10
    },
    {
      "term": "Desloratadine",
      "count": 10
    },
    {
      "term": "DOXYCYCLINE",
      "count": 10
    },
    {
      "term": "DIPHENHYDRAMINE HYDROCHLORIDE",
      "count": 10
    },
    {
      "term": "Cyanocobalamin",
      "count": 10
    },
    {
      "term": "ChloraPrep One-Step",
      "count": 10
    },
    {
      "term": "Childrens TYLENOL",
      "count": 10
    },
    {
      "term": "CIPROFLOXACIN",
      "count": 10
    },
    {
      "term": "CEFPROZIL",
      "count": 10
    },
    {
      "term": "CAPTOPRIL",
      "count": 10
    },
    {
      "term": "Azithromycin Dihydrate",
      "count": 10
    },
    {
      "term": "Arnica Plus",
      "count": 10
    },
    {
      "term": "ARNICA MONTANA",
      "count": 10
    },
    {
      "term": "ACYCLOVIR",
      "count": 10
    },
    {
      "term": "ACETAMINOPHEN AND CODEINE PHOSPHATE",
      "count": 10
    },
    {
      "term": "zaleplon",
      "count": 9
    },
    {
      "term": "sugar free cherry cough drops",
      "count": 9
    },
    {
      "term": "promethazine hydrochloride",
      "count": 9
    },
    {
      "term": "pain and fever",
      "count": 9
    },
    {
      "term": "oxycodone hydrochloride",
      "count": 9
    },
    {
      "term": "ondansetron hydrochloride",
      "count": 9
    },
    {
      "term": "levofloxacin",
      "count": 9
    },
    {
      "term": "kids cough",
      "count": 9
    },
    {
      "term": "eye itch relief",
      "count": 9
    },
    {
      "term": "donepezil hydrochloride",
      "count": 9
    },
    {
      "term": "clindamycin phosphate",
      "count": 9
    },
    {
      "term": "cetirizine hydrochloride",
      "count": 9
    },
    {
      "term": "Zithromax",
      "count": 9
    },
    {
      "term": "Zap APF",
      "count": 9
    },
    {
      "term": "VERAPAMIL HYDROCHLORIDE",
      "count": 9
    },
    {
      "term": "Up and Up Nicotine",
      "count": 9
    },
    {
      "term": "UREA",
      "count": 9
    },
    {
      "term": "Triple Antibiotic Plus Pain Relief",
      "count": 9
    },
    {
      "term": "Trimethoprim",
      "count": 9
    },
    {
      "term": "Triazolam",
      "count": 9
    },
    {
      "term": "Topcare Nicotine",
      "count": 9
    },
    {
      "term": "Terconazole",
      "count": 9
    },
    {
      "term": "Tartar Control Plus",
      "count": 9
    },
    {
      "term": "Systemic Detox",
      "count": 9
    },
    {
      "term": "Sorbet APF",
      "count": 9
    },
    {
      "term": "Sleep Aid Nighttime",
      "count": 9
    },
    {
      "term": "Saline Laxative",
      "count": 9
    },
    {
      "term": "SF Honey Lemon Cough Drop",
      "count": 9
    },
    {
      "term": "Ropinirole",
      "count": 9
    },
    {
      "term": "Regular Strength Aspirin EC",
      "count": 9
    },
    {
      "term": "Raloxifene Hydrochloride",
      "count": 9
    },
    {
      "term": "Premarin",
      "count": 9
    },
    {
      "term": "Prednisolone",
      "count": 9
    },
    {
      "term": "Polymyxin B Sulfate and Trimethoprim",
      "count": 9
    },
    {
      "term": "Polyethylene Glycol 3350",
      "count": 9
    },
    {
      "term": "Phenylephrine Hydrochloride",
      "count": 9
    },
    {
      "term": "Patterson Dental Topical Anesthetic",
      "count": 9
    },
    {
      "term": "Minocycline hydrochloride",
      "count": 9
    },
    {
      "term": "Menstrual Relief Maximum Strength",
      "count": 9
    },
    {
      "term": "Menopause",
      "count": 9
    },
    {
      "term": "Meclizine HCl",
      "count": 9
    },
    {
      "term": "Loratadine and Pseudoephedrine",
      "count": 9
    },
    {
      "term": "Labetalol hydrochloride",
      "count": 9
    },
    {
      "term": "Isopropyl alcohol 91 percent",
      "count": 9
    },
    {
      "term": "Honey Lemon Cough Drops",
      "count": 9
    },
    {
      "term": "Granisetron Hydrochloride",
      "count": 9
    },
    {
      "term": "General Protection",
      "count": 9
    },
    {
      "term": "Fleet",
      "count": 9
    },
    {
      "term": "Fentanyl Citrate, Bupivacaine HCl",
      "count": 9
    },
    {
      "term": "FAMOTIDINE",
      "count": 9
    },
    {
      "term": "Dipyridamole",
      "count": 9
    },
    {
      "term": "Diltiazem Hydrochloride Extended Release",
      "count": 9
    },
    {
      "term": "Dexmedetomidine Hydrochloride",
      "count": 9
    },
    {
      "term": "Depo-Medrol",
      "count": 9
    },
    {
      "term": "Demeclocycline Hydrochloride",
      "count": 9
    },
    {
      "term": "DIGOXIN",
      "count": 9
    },
    {
      "term": "Cough",
      "count": 9
    },
    {
      "term": "Cold and Flu Nighttime",
      "count": 9
    },
    {
      "term": "Clindamycin Phosphate",
      "count": 9
    },
    {
      "term": "Childrens Plus Cough and Runny Nose",
      "count": 9
    },
    {
      "term": "Chest Rub",
      "count": 9
    },
    {
      "term": "Cefoxitin",
      "count": 9
    },
    {
      "term": "CEFTRIAXONE",
      "count": 9
    },
    {
      "term": "BUPROPION HYDROCHLORIDE",
      "count": 9
    },
    {
      "term": "Azelastine Hydrochloride",
      "count": 9
    },
    {
      "term": "Azathioprine",
      "count": 9
    },
    {
      "term": "Australian Gold Broad Spectrum SPF 15",
      "count": 9
    },
    {
      "term": "Atovaquone and Proguanil Hydrochloride",
      "count": 9
    },
    {
      "term": "Artificial Tears",
      "count": 9
    },
    {
      "term": "Allergy Relief Antihistamine",
      "count": 9
    },
    {
      "term": "Adapalene",
      "count": 9
    },
    {
      "term": "potassium chloride",
      "count": 8
    },
    {
      "term": "phendimetrazine tartrate",
      "count": 8
    },
    {
      "term": "pain relief pm extra strength",
      "count": 8
    },
    {
      "term": "mally Face Defender Foundation BB",
      "count": 8
    },
    {
      "term": "good neighbor pharmacy nicotine",
      "count": 8
    },
    {
      "term": "eszopiclone",
      "count": 8
    },
    {
      "term": "equaline nicotine",
      "count": 8
    },
    {
      "term": "equaline antacid",
      "count": 8
    },
    {
      "term": "diltiazem hydrochloride",
      "count": 8
    },
    {
      "term": "cold relief",
      "count": 8
    },
    {
      "term": "childrens pain and fever",
      "count": 8
    },
    {
      "term": "butalbital, acetaminophen and caffeine",
      "count": 8
    },
    {
      "term": "amoxicillin and clavulanate potassium",
      "count": 8
    },
    {
      "term": "Zaleplon",
      "count": 8
    },
    {
      "term": "Womens Gentle Laxative",
      "count": 8
    },
    {
      "term": "WELLBUTRIN XL",
      "count": 8
    },
    {
      "term": "Vecuronium Bromide",
      "count": 8
    },
    {
      "term": "Valsartan and hydrochlorothiazide",
      "count": 8
    },
    {
      "term": "Valproic",
      "count": 8
    },
    {
      "term": "VANCOMYCIN HYDROCHLORIDE",
      "count": 8
    },
    {
      "term": "Trandolapril",
      "count": 8
    },
    {
      "term": "Tiger Supply Inc APF",
      "count": 8
    },
    {
      "term": "Thiothixene",
      "count": 8
    },
    {
      "term": "Tamsulosin hydrochloride",
      "count": 8
    },
    {
      "term": "Tamiflu",
      "count": 8
    },
    {
      "term": "TYLENOL Extra Strength",
      "count": 8
    },
    {
      "term": "TRIPLE ANTIBIOTIC",
      "count": 8
    },
    {
      "term": "TRAMADOL HYDROCHLORIDE AND ACETAMINOPHEN",
      "count": 8
    },
    {
      "term": "T-Relief",
      "count": 8
    },
    {
      "term": "Suphedrine PE",
      "count": 8
    },
    {
      "term": "Supersmile",
      "count": 8
    },
    {
      "term": "Sugar Free Menthol Cough Drops",
      "count": 8
    },
    {
      "term": "Stavudine",
      "count": 8
    },
    {
      "term": "Severe Cold and Flu",
      "count": 8
    },
    {
      "term": "Senna laxative",
      "count": 8
    },
    {
      "term": "Senna",
      "count": 8
    },
    {
      "term": "SULPHUR",
      "count": 8
    },
    {
      "term": "SF Cherry Cough Drop",
      "count": 8
    },
    {
      "term": "Pyrimethamine Leucovorin",
      "count": 8
    },
    {
      "term": "Oil Free Acne Wash",
      "count": 8
    },
    {
      "term": "OXCARBAZEPINE",
      "count": 8
    },
    {
      "term": "Nitrostat",
      "count": 8
    },
    {
      "term": "Muscle Ice",
      "count": 8
    },
    {
      "term": "Mucus Relief Cold and Sinus Maximum Strength",
      "count": 8
    },
    {
      "term": "Modesa",
      "count": 8
    },
    {
      "term": "Misoprostol",
      "count": 8
    },
    {
      "term": "Methyldopa",
      "count": 8
    },
    {
      "term": "Medicated Apricot Scrub",
      "count": 8
    },
    {
      "term": "Lexapro",
      "count": 8
    },
    {
      "term": "Laxative Maximum Strength",
      "count": 8
    },
    {
      "term": "LOSARTAN POTASSIUM AND HYDROCHLOROTHIAZIDE",
      "count": 8
    },
    {
      "term": "LANSOPRAZOLE",
      "count": 8
    },
    {
      "term": "Ibuprofen PM",
      "count": 8
    },
    {
      "term": "INSTANT HAND SANITIZER",
      "count": 8
    },
    {
      "term": "Hydroxyzine hydrochloride",
      "count": 8
    },
    {
      "term": "Hydrocortisone Maximum Strength",
      "count": 8
    },
    {
      "term": "Hydrocodone Bitartrate and Ibuprofen",
      "count": 8
    },
    {
      "term": "HYDROCHLOROTHIAZIDE",
      "count": 8
    },
    {
      "term": "Gelato Topical Anesthetic",
      "count": 8
    },
    {
      "term": "Fludeoxyglucose F18",
      "count": 8
    },
    {
      "term": "FERRUM PHOSPHORICUM",
      "count": 8
    },
    {
      "term": "Eye Wash",
      "count": 8
    },
    {
      "term": "Eye Itch Relief",
      "count": 8
    },
    {
      "term": "Extended Phenytoin Sodium",
      "count": 8
    },
    {
      "term": "Econazole Nitrate",
      "count": 8
    },
    {
      "term": "Dutasteride",
      "count": 8
    },
    {
      "term": "Dry Scalp Care",
      "count": 8
    },
    {
      "term": "Diclofenac sodium",
      "count": 8
    },
    {
      "term": "Diclofenac Sodium Delayed Release",
      "count": 8
    },
    {
      "term": "Cromolyn Sodium",
      "count": 8
    },
    {
      "term": "Clindamycin",
      "count": 8
    },
    {
      "term": "Cialis",
      "count": 8
    },
    {
      "term": "Cellular Swiss Sunscreen Broad Spectrum SPF 30",
      "count": 8
    },
    {
      "term": "Burkhart Topical Anesthetic",
      "count": 8
    },
    {
      "term": "Bupropion Hydrochloride SR",
      "count": 8
    },
    {
      "term": "Benzo-Jel",
      "count": 8
    },
    {
      "term": "Benazepril Hydrochloride and Hydrochlorothiazide",
      "count": 8
    },
    {
      "term": "BENZONATATE",
      "count": 8
    },
    {
      "term": "Arnica",
      "count": 8
    },
    {
      "term": "Antibacterial Wet Wipes",
      "count": 8
    },
    {
      "term": "Antibacterial Hand",
      "count": 8
    },
    {
      "term": "ALLIUM CEPA",
      "count": 8
    },
    {
      "term": "up and up allergy relief",
      "count": 7
    },
    {
      "term": "sumatriptan succinate",
      "count": 7
    },
    {
      "term": "sugar free honey lemon cough drops",
      "count": 7
    },
    {
      "term": "ropinirole",
      "count": 7
    },
    {
      "term": "propranolol hydrochloride",
      "count": 7
    },
    {
      "term": "pain relief pm",
      "count": 7
    },
    {
      "term": "nighttime cold and flu relief",
      "count": 7
    },
    {
      "term": "nasal decongestant",
      "count": 7
    },
    {
      "term": "montelukast sodium",
      "count": 7
    },
    {
      "term": "miconazole 3",
      "count": 7
    },
    {
      "term": "members mark nicotine",
      "count": 7
    },
    {
      "term": "in control nicotine",
      "count": 7
    },
    {
      "term": "hydrocodone bitartrate and acetaminophen",
      "count": 7
    },
    {
      "term": "escitalopram oxalate",
      "count": 7
    },
    {
      "term": "equate daytime nitetime",
      "count": 7
    },
    {
      "term": "diphenhydramine hydrochloride",
      "count": 7
    },
    {
      "term": "clarithromycin",
      "count": 7
    },
    {
      "term": "ck one 3-in-1 face makeup with SPF 8 sunscreen",
      "count": 7
    },
    {
      "term": "childrens ibuprofen",
      "count": 7
    },
    {
      "term": "cefuroxime axetil",
      "count": 7
    },
    {
      "term": "bupropion",
      "count": 7
    },
    {
      "term": "bisoprolol fumarate and hydrochlorothiazide",
      "count": 7
    },
    {
      "term": "arthritis pain relief",
      "count": 7
    },
    {
      "term": "Zyvox",
      "count": 7
    },
    {
      "term": "Zolpidem tartrate",
      "count": 7
    },
    {
      "term": "Virx",
      "count": 7
    },
    {
      "term": "Virustat",
      "count": 7
    },
    {
      "term": "ULTRACET",
      "count": 7
    },
    {
      "term": "Tricor",
      "count": 7
    },
    {
      "term": "Tri-Sprintec",
      "count": 7
    },
    {
      "term": "Topotecan Hydrochloride",
      "count": 7
    },
    {
      "term": "Top Quality Mfg. Topical Anesthetic",
      "count": 7
    },
    {
      "term": "TobraDex",
      "count": 7
    },
    {
      "term": "Tetracaine Hydrochloride",
      "count": 7
    },
    {
      "term": "Terocin",
      "count": 7
    },
    {
      "term": "Tension Headache Relief",
      "count": 7
    },
    {
      "term": "TEMAZEPAM",
      "count": 7
    },
    {
      "term": "Spatheraphy",
      "count": 7
    },
    {
      "term": "Senna Plus",
      "count": 7
    },
    {
      "term": "SUMATRIPTAN",
      "count": 7
    },
    {
      "term": "PureLife APF",
      "count": 7
    },
    {
      "term": "Propylthiouracil",
      "count": 7
    },
    {
      "term": "Proparacaine Hydrochloride",
      "count": 7
    },
    {
      "term": "Primo Topical Anesthetic",
      "count": 7
    },
    {
      "term": "Plavix",
      "count": 7
    },
    {
      "term": "Plak Smacker",
      "count": 7
    },
    {
      "term": "Permethrin",
      "count": 7
    },
    {
      "term": "Pain Relief Regular Strength",
      "count": 7
    },
    {
      "term": "Paclitaxel",
      "count": 7
    },
    {
      "term": "PHENYTOIN SODIUM",
      "count": 7
    },
    {
      "term": "Oxymorphone hydrochloride",
      "count": 7
    },
    {
      "term": "Nitroglycerin",
      "count": 7
    },
    {
      "term": "Nimodipine",
      "count": 7
    },
    {
      "term": "Nighttime Sleep Aid Maximum Strength",
      "count": 7
    },
    {
      "term": "Nifedipine Extended Release",
      "count": 7
    },
    {
      "term": "Nicotine Polacrilex",
      "count": 7
    },
    {
      "term": "Niaspan",
      "count": 7
    },
    {
      "term": "Nasal Decongestant PE",
      "count": 7
    },
    {
      "term": "Nafcillin",
      "count": 7
    },
    {
      "term": "NRG APF",
      "count": 7
    },
    {
      "term": "Morphine Sulfate Extended Release",
      "count": 7
    },
    {
      "term": "Midodrine Hydrochloride",
      "count": 7
    },
    {
      "term": "Midazolam HCl",
      "count": 7
    },
    {
      "term": "Marcaine",
      "count": 7
    },
    {
      "term": "METRONIDAZOLE",
      "count": 7
    },
    {
      "term": "Low Dose Aspirin",
      "count": 7
    },
    {
      "term": "Loratadine antihistamine",
      "count": 7
    },
    {
      "term": "Liothyronine Sodium",
      "count": 7
    },
    {
      "term": "Lice Treatment",
      "count": 7
    },
    {
      "term": "LIDODERM",
      "count": 7
    },
    {
      "term": "LEVOFLOXACIN",
      "count": 7
    },
    {
      "term": "Kaletra",
      "count": 7
    },
    {
      "term": "Isopropyl Rubbing Alcohol",
      "count": 7
    },
    {
      "term": "ISOSORBIDE MONONITRATE",
      "count": 7
    },
    {
      "term": "Hydrocodone Bitartrate and Homatropine Methylbromide",
      "count": 7
    },
    {
      "term": "Healing",
      "count": 7
    },
    {
      "term": "Halobetasol Propionate",
      "count": 7
    },
    {
      "term": "HAWAIIAN TROPIC",
      "count": 7
    },
    {
      "term": "Good Sense Nicotine",
      "count": 7
    },
    {
      "term": "Glycerin",
      "count": 7
    },
    {
      "term": "FIDELIS Topical Anesthetic",
      "count": 7
    },
    {
      "term": "FENTANYL CITRATE",
      "count": 7
    },
    {
      "term": "Extra Strength Mapap",
      "count": 7
    },
    {
      "term": "Esomeprazole Magnesium",
      "count": 7
    },
    {
      "term": "Escitalopram Oxalate",
      "count": 7
    },
    {
      "term": "Doxazosin Mesylate",
      "count": 7
    },
    {
      "term": "Diphenhydramine",
      "count": 7
    },
    {
      "term": "Dextroamphetamine Sulfate",
      "count": 7
    },
    {
      "term": "Desonide",
      "count": 7
    },
    {
      "term": "DayTime Cold and Flu",
      "count": 7
    },
    {
      "term": "Dapsone",
      "count": 7
    },
    {
      "term": "DIGOX",
      "count": 7
    },
    {
      "term": "Cytarabine",
      "count": 7
    },
    {
      "term": "Cyclosporine",
      "count": 7
    },
    {
      "term": "Cough Relief",
      "count": 7
    },
    {
      "term": "Cotton Candy Scented Hand Sanitizer",
      "count": 7
    },
    {
      "term": "Cold and Allergy",
      "count": 7
    },
    {
      "term": "Cold Sore Treatment",
      "count": 7
    },
    {
      "term": "Chlorpheniramine Maleate",
      "count": 7
    },
    {
      "term": "Childrens Loratadine",
      "count": 7
    },
    {
      "term": "Calcium Chloride",
      "count": 7
    },
    {
      "term": "CYPROHEPTADINE HYDROCHLORIDE",
      "count": 7
    },
    {
      "term": "CARBON DIOXIDE",
      "count": 7
    },
    {
      "term": "Benicar",
      "count": 7
    },
    {
      "term": "Aspirin Enteric Coated",
      "count": 7
    },
    {
      "term": "Antimicrobial Hand Sanitizer",
      "count": 7
    },
    {
      "term": "Anti Diarrheal",
      "count": 7
    },
    {
      "term": "Ammonium Lactate",
      "count": 7
    },
    {
      "term": "Allergy Multi-Symptom",
      "count": 7
    },
    {
      "term": "Alcohol-Free Anticavity",
      "count": 7
    },
    {
      "term": "Acarbose",
      "count": 7
    },
    {
      "term": "ANTIBACTERIAL",
      "count": 7
    },
    {
      "term": "AMOXICILLIN AND CLAVULANATE POTASSIUM",
      "count": 7
    },
    {
      "term": "ADVAIR DISKUS",
      "count": 7
    },
    {
      "term": "2 in 1 Dandruff",
      "count": 7
    },
    {
      "term": "sunmark pain reliever",
      "count": 6
    },
    {
      "term": "sleep aid",
      "count": 6
    },
    {
      "term": "rizatriptan benzoate",
      "count": 6
    },
    {
      "term": "promethazine hydrochloride and codeine phosphate",
      "count": 6
    },
    {
      "term": "pain reliever extra strength",
      "count": 6
    },
    {
      "term": "nighttime sleep aid",
      "count": 6
    },
    {
      "term": "moisturizing anti-bacterial hand soap",
      "count": 6
    },
    {
      "term": "misoprostol",
      "count": 6
    },
    {
      "term": "migraine relief",
      "count": 6
    },
    {
      "term": "migraine formula",
      "count": 6
    },
    {
      "term": "miconazole 7",
      "count": 6
    },
    {
      "term": "mally Lip Defender",
      "count": 6
    },
    {
      "term": "lice killing",
      "count": 6
    },
    {
      "term": "ketoconazole",
      "count": 6
    },
    {
      "term": "iSmile Topical Anesthetic",
      "count": 6
    }
  ]

  module.exports = {
    DrugsData:DrugsData

  };
