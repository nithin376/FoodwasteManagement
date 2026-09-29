import { Link } from "react-router-dom";
import {
  Leaf,
  Package,
  Sparkles,
  HeartHandshake,
  ChartNoAxesCombined,
  ArrowUpRight,
  ArrowRight,
  Check,
  Clock,
  Utensils,
  Sprout,
  Wallet,
} from "lucide-react";
import { alerts } from "../data/dashboardData";
import { ngos } from "../data/ngoData";
import {
  Brand,
  StatusBadge,
  PageHeader,
  KpiCard,
  ChartCard,
  AIInsightCard,
  AlertCard,
  ForecastChart,
  WasteChart,
} from "../components/ui";
export function Dashboard() {
  return (
    <>
      <PageHeader
        eyebrow="YOUR DAILY IMPACT, AT A GLANCE"
        title="Good morning, Admin 👋"
        subtitle="Here's your food sustainability overview for today."
        action={
          <div className="date-pill">
            <Clock size={16} /> Mon, 28 Sep 2026
          </div>
        }
      />
      <div className="overview-banner">
        <span>
          <span className="green-dot" /> Your kitchen is making a difference.{" "}
          <strong>32% less food waste</strong> this month.
        </span>
        <Link to="/analytics">
          View impact <ArrowRight size={16} />
        </Link>
      </div>
      <div className="kpi-grid">
        <KpiCard
          label="Today's food prepared"
          value="1,850"
          unit="meals"
          trend="4.2%"
          icon={Utensils}
        />
        <KpiCard
          label="Predicted surplus"
          value="126"
          unit="kg"
          trend="12% less"
          icon={Sparkles}
          tone="peach"
        />
        <KpiCard
          label="Food rescued"
          value="94"
          unit="kg"
          trend="18.6%"
          icon={HeartHandshake}
          tone="lavender"
        />
        <KpiCard
          label="Waste prevented"
          value="72"
          unit="kg"
          trend="24.8%"
          icon={Sprout}
        />
        <KpiCard
          label="Estimated savings"
          value="₹18,450"
          trend="8.2%"
          icon={Wallet}
          tone="sand"
        />
      </div>
      <div className="dashboard-main">
        <div>
          <ChartCard
            title="A smarter forecast. A better tomorrow."
            subtitle="Food demand forecast · Meals per day"
          >
            <div className="chart-legend">
              <span>
                <i />
                Actual consumption
              </span>
              <span>
                <i className="light" />
                Predicted demand
              </span>
              <span>
                <i className="amber" />
                Predicted surplus
              </span>
            </div>
            <ForecastChart />
          </ChartCard>
          <div className="two-col bottom-charts">
            <ChartCard
              title="Every meal counts"
              subtitle="Your food flow this week"
            >
              <WasteChart />
            </ChartCard>
            <section className="card impact-card">
              <span className="eyebrow">THE HUMAN SIDE OF YOUR IMPACT</span>
              <div className="impact-art">
                <HeartHandshake size={64} strokeWidth={1.1} />
                <span>✦</span>
              </div>
              <h2>
                1,240 <span>meals</span>
              </h2>
              <p>
                found their way to someone
                <br />
                who needed them.
              </p>
              <Link to="/redistribution">
                Keep the good going <ArrowUpRight size={16} />
              </Link>
            </section>
          </div>
        </div>
        <AIInsightCard />
      </div>
      <section className="card alerts">
        <div className="section-heading">
          <div>
            <h3>A little attention goes a long way</h3>
            <p>Recent alerts & activity</p>
          </div>
          <Link to="/quality">
            Quality monitor <ArrowRight size={16} />
          </Link>
        </div>
        <div className="alerts-grid">
          {alerts.map((a) => (
            <AlertCard key={a.title} {...a} />
          ))}
        </div>
      </section>
    </>
  );
}
export function Landing() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Brand />
        <nav>
          <a href="#how">How it works</a>
          <a href="#features">The platform</a>
          <Link to="/analytics">Our impact</Link>
        </nav>
        <Link className="button primary" to="/dashboard">
          Open Dashboard <ArrowUpRight size={17} />
        </Link>
      </header>
      <main>
        <div className="hero">
          <div>
            <div className="hero-pill">
              <span className="green-dot" /> BETTER FOR PEOPLE. BETTER FOR THE
              PLANET.
            </div>
            <h1>
              Turn Surplus Food
              <br />
              Into <em>Social Impact.</em>
            </h1>
            <h2>Good food. Full potential. Zero wasted chances.</h2>
            <p>
              AI-powered food demand prediction, surplus detection and
              intelligent redistribution for institutional kitchens and food
              processing units.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/dashboard">
                Open Dashboard <ArrowUpRight size={18} />
              </Link>
              <a href="#how" className="button secondary">
                See How It Works <ArrowRight size={18} />
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <span>AK</span>
                <span>SP</span>
                <span>RM</span>
              </div>
              <span>
                One connected ecosystem.
                <br />
                <strong>Countless second chances.</strong>
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-note">
              <span className="icon-box mint">
                <Check size={18} />
              </span>
              <div>
                <strong>Good food, rescued.</strong>
                <small>18 kg matched with a nearby kitchen</small>
              </div>
            </div>
            <div className="mini-dashboard">
              <div className="mini-header">
                <Brand />
                <StatusBadge>Live demo</StatusBadge>
              </div>
              <div className="mini-title">
                <small>MONDAY, SEPTEMBER 28</small>
                <h3>Small changes. Real impact.</h3>
              </div>
              <div className="mini-kpis">
                <div>
                  <small>Food rescued</small>
                  <strong>
                    94 <em>kg</em>
                  </strong>
                  <span>↗ 18.6% this week</span>
                </div>
                <div>
                  <small>Meals redistributed</small>
                  <strong>1,240</strong>
                  <span>More food. Less waste.</span>
                </div>
              </div>
              <div className="mini-chart">
                <h3>Demand, meet intelligence.</h3>
                <ForecastChart />
              </div>
              <div className="mini-match">
                <span className="food-icon">🍚</span>
                <div>
                  <strong>Cooked rice · 18 kg</strong>
                  <small>Matched to Community Kitchen A</small>
                </div>
                <span className="match">
                  94%<small>match</small>
                </span>
              </div>
            </div>
            <div className="floating-impact">
              <Leaf size={24} />
              <div>
                <strong>32% less waste</strong>
                <small>A healthier kitchen. A happier planet.</small>
              </div>
            </div>
            <div className="visual-caption">
              A glimpse of your next, more sustainable chapter.
            </div>
          </div>
        </div>
        <section className="landing-stats">
          {[
            ["32%", "less food waste"],
            ["1,240", "meals redistributed"],
            ["680 kg", "food rescued"],
            ["₹18,450", "operational savings"],
          ].map(([n, l]) => (
            <div key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
          <small>Illustrative demo data</small>
        </section>
        <section id="features" className="features">
          <div className="eyebrow">BUILT FOR THE BIGGER PICTURE</div>
          <h2>From your kitchen to a kinder world.</h2>
          <p>Intelligence at every step. Impact in every meal.</p>
          <div className="feature-grid">
            {[
              [
                "AI Demand Forecasting",
                "Prepare what you need with clear, data-informed demand predictions.",
              ],
              [
                "Smart Surplus Detection",
                "Spot tomorrow’s surplus and take action while food is still fresh.",
              ],
              [
                "Intelligent Redistribution",
                "Connect good food with the communities that need it most.",
              ],
              [
                "Sustainability Analytics",
                "Make your environmental and social impact visible.",
              ],
            ].map(([title, text], i) => {
              const I = [
                Sparkles,
                Package,
                HeartHandshake,
                ChartNoAxesCombined,
              ][i];
              return (
                <article className="card" key={title}>
                  <span className="icon-box mint">
                    <I />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section id="how" className="workflow">
          <div className="eyebrow">ONE LOOP. LASTING CHANGE.</div>
          <h2>Nothing good should go to waste.</h2>
          <div className="workflow-steps">
            {[
              "Predict demand",
              "Detect surplus",
              "Assess quality",
              "Match recipients",
              "Optimize routes",
              "Redistribute food",
              "Measure impact",
            ].map((s, i) => (
              <div key={s}>
                <span>0{i + 1}</span>
                <strong>{s}</strong>
                {i < 6 && <ArrowRight size={15} />}
              </div>
            ))}
          </div>
          <Link className="button primary" to="/dashboard">
            See the loop in action <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>
      <footer>
        <Brand />
        <span>Built for a future with less waste and more possibility.</span>
        <small>Hackathon prototype · All insights are simulated</small>
      </footer>
    </div>
  );
}
