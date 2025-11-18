export function SkillsSection() {
  const skills = [
    {
      icon: "📊",
      title: "Reporting & Suivi de Performance",
      category: "Analyse de Données",
      description: [
        "Collecte et structuration de données issues de multiples sources (Analytics, CRM, Bases de données)",
        "Création de tableaux de bord interactifs et automatisés",
        "Analyse de KPIs métiers et recommandations stratégiques",
        "Visualisation de données pour faciliter la prise de décision"
      ]
    },
    {
      icon: "📈",
      title: "Acquisition & Optimisation de Campagnes",
      category: "Marketing Digital",
      description: [
        "Stratégie d'acquisition multicanale (SEA, Social Ads, Display)",
        "Configuration et optimisation de campagnes publicitaires",
        "A/B testing et analyse de performance créative",
        "Suivi du ROI et ajustement des budgets en temps réel"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-netflix-dark-gray/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold text-white">
            Compétences
          </h2>
          <p className="text-lg text-muted-foreground">
            Mes domaines d'expertise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-netflix-red/50"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-lg bg-netflix-red/20 p-4 text-4xl">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {skill.title}
                  </h3>
                  <p className="text-netflix-red font-semibold">
                    {skill.category}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {skill.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-netflix-red mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
