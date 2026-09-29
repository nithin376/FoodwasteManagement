import { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Leaf,
  LayoutDashboard,
  Package,
  Sparkles,
  HeartHandshake,
  Truck,
  ShieldCheck,
  ChartNoAxesCombined,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  ArrowRight,
  Plus,
  X,
  Check,
  Clock,
  MapPin,
  Sprout,
  Menu,
  Thermometer,
  Droplets,
  Camera,
} from "lucide-react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { alerts } from "./data/dashboardData";
import { inventoryData, type Food } from "./data/inventoryData";
import { ngos } from "./data/ngoData";
import {
  Brand,
  StatusBadge,
  PageHeader,
  KpiCard,
  ChartCard,
  AlertCard,
  Modal,
  Toast,
} from "./components/ui";
import { Dashboard, Landing } from "./pages/Overview";
import {
  InventoryTable,
  SurplusCard,
  NGOCard,
  RouteMap,
  Analytics,
} from "./pages/WorkspaceViews";
const nav = [
  ["/dashboard", "Overview", LayoutDashboard],
  ["/inventory", "Inventory", Package],
  ["/surplus", "Surplus detection", Sparkles],
  ["/redistribution", "Redistribution", HeartHandshake],
  ["/logistics", "Smart logistics", Truck],
  ["/quality", "Quality monitor", ShieldCheck],
  ["/analytics", "Impact analytics", ChartNoAxesCombined],
] as const;
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState<Food[]>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("foodloop-inventory") || "null") ||
        inventoryData
      );
    } catch {
      return inventoryData;
    }
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [risk, setRisk] = useState("All risks");
  const [expiry, setExpiry] = useState("All expiry");
  const [modal, setModal] = useState<{
    type: string;
    item?: Food;
    ngo?: string;
  } | null>(null);
  const [selectedFood, setSelectedFood] = useState("Cooked Rice");
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [pickup, setPickup] = useState("Pickup scheduled");
  const [deliveryDetails, setDeliveryDetails] = useState({
    destination: "Community Kitchen A",
    food: "Cooked Rice",
    time: "2026-09-28T14:30",
  });
  const [tab, setTab] = useState("Overview");
  const [institution, setInstitution] = useState("DSCE Institutional Kitchen");
  const [settingsTab, setSettingsTab] = useState("Institution profile");
  const [settings, setSettings] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("foodloop-settings") || "null") || {
          name: "DSCE Institutional Kitchen",
          email: "admin@dsce.edu.in",
          threshold: 8,
          notifications: true,
        }
      );
    } catch {
      return {
        name: "DSCE Institutional Kitchen",
        email: "admin@dsce.edu.in",
        threshold: 8,
        notifications: true,
      };
    }
  });
  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(""), 4000);
      return () => clearTimeout(id);
    }
  }, [toast]);
  useEffect(() => {
    localStorage.setItem("foodloop-inventory", JSON.stringify(inventory));
  }, [inventory]);
  useEffect(() => {
    setSidebar(false);
    setSearch("");
    setTab("Overview");
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const exportReport = () => {
    const csv =
      "Metric,Value,Unit\nFood waste prevented,680,kg\nFood redistributed,1240,kg\nCO2 avoided,1.8,tonnes\nWater saved,420000,L\nCost savings,84500,INR\nSource,Simulated demo data,\n";
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "foodloop-demo-impact.csv";
    a.click();
    URL.revokeObjectURL(url);
    setToast("Demo impact report downloaded");
  };
  const inventoryAction = (action: string, item: Food) => {
    if (action === "Redistribute") {
      setSelectedFood(item.name);
      navigate("/redistribution");
    } else setModal({ type: action, item });
  };
  const filtered = inventory.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === "All categories" || i.category === category) &&
      (risk === "All risks" || i.risk === risk) &&
      (expiry === "All expiry" ||
        (expiry === "Within 24 hours" ? i.days <= 1 : i.days <= 3)),
  );
  return (
    <>
      {location.pathname === "/" ? (
        <Landing />
      ) : (
        <div className="app-shell">
          <aside className={"sidebar " + (sidebar ? "open" : "")}>
            <Brand />
            <span className="nav-label">WORKSPACE</span>
            <nav>
              {nav.map(([path, label, Icon]) => (
                <NavLink key={path} to={path}>
                  <Icon size={19} />
                  {label}
                  {path === "/surplus" && <span className="nav-count">3</span>}
                </NavLink>
              ))}
            </nav>
            <div className="sidebar-bottom">
              <div className="sidebar-impact">
                <span className="icon-box mint">
                  <Sprout size={22} />
                </span>
                <strong>
                  Small actions.
                  <br />
                  Meaningful impact.
                </strong>
                <p>
                  You're part of a better
                  <br />
                  food future.
                </p>
                <Link to="/analytics">
                  See your impact <ArrowUpRight size={15} />
                </Link>
              </div>
              <NavLink className="settings-link" to="/settings">
                <Settings size={19} />
                Settings
              </NavLink>
              <button
                className="sidebar-profile"
                onClick={() => {
                  setSettingsTab("Institution profile");
                  navigate("/settings");
                }}
              >
                <span className="avatar">AD</span>
                <span>
                  <strong>Admin</strong>
                  <small>Sustainability manager</small>
                </span>
              </button>
            </div>
          </aside>
          {sidebar && (
            <button
              className="sidebar-overlay"
              aria-label="Close menu"
              onClick={() => setSidebar(false)}
            />
          )}
          <div className="workspace">
            <header className="topbar">
              <button
                className="icon-button mobile-menu"
                aria-label="Open navigation"
                onClick={() => setSidebar(true)}
              >
                <Menu />
              </button>
              <div className="global-search">
                <Search size={18} />
                <input
                  aria-label="Search pages"
                  placeholder="Search anything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <kbd>⌘ K</kbd>
                {search && (
                  <div className="search-results">
                    {nav
                      .filter((n) =>
                        n[1].toLowerCase().includes(search.toLowerCase()),
                      )
                      .map(([path, label]) => (
                        <Link key={path} to={path}>
                          {label}
                          <ArrowUpRight size={15} />
                        </Link>
                      ))}
                    {!nav.some((n) =>
                      n[1].toLowerCase().includes(search.toLowerCase()),
                    ) && <p>No pages found. Try “inventory”.</p>}
                  </div>
                )}
              </div>
              <div className="topbar-right">
                <span className="demo-pill">DEMO WORKSPACE</span>
                <select
                  aria-label="Institution"
                  value={institution}
                  onChange={(e) => {
                    setInstitution(e.target.value);
                    setToast("Demo institution updated");
                  }}
                >
                  <option>{settings.name}</option>
                  <option>Food Processing Unit · Demo</option>
                </select>
                <div className="notification-wrap">
                  <button
                    className="icon-button bell"
                    aria-label="Notifications"
                    aria-expanded={notifications}
                    onClick={() => setNotifications(!notifications)}
                  >
                    <Bell size={19} />
                    <i />
                  </button>
                  {notifications && (
                    <div className="notification-panel card">
                      <div className="section-heading">
                        <h3>Notifications</h3>
                        <button
                          className="icon-button"
                          aria-label="Close notifications"
                          onClick={() => setNotifications(false)}
                        >
                          <X size={17} />
                        </button>
                      </div>
                      {settings.notifications ? (
                        alerts.map((a) => <AlertCard key={a.title} {...a} />)
                      ) : (
                        <p>Notifications are paused in settings.</p>
                      )}
                    </div>
                  )}
                </div>
                <button
                  className="avatar"
                  aria-label="Profile settings"
                  onClick={() => navigate("/settings")}
                >
                  AD
                </button>
              </div>
            </header>
            <main className="main-content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/inventory"
                  element={
                    <>
                      <PageHeader
                        title="Good food starts with good visibility."
                        subtitle="Keep every ingredient accounted for, fresh, and ready for its next use."
                        eyebrow="INVENTORY MANAGEMENT"
                        action={
                          <button
                            className="button primary"
                            onClick={() => setModal({ type: "Add inventory" })}
                          >
                            <Plus size={17} />
                            Add item
                          </button>
                        }
                      />
                      <div className="three-col">
                        <KpiCard
                          label="Active food batches"
                          value={String(inventory.length)}
                          trend="All tracked"
                          icon={Package}
                        />
                        <KpiCard
                          label="Requires attention"
                          value={String(
                            inventory.filter((i) => i.days <= 1).length,
                          )}
                          unit="batches"
                          trend="Act today"
                          icon={Clock}
                          tone="peach"
                        />
                        <KpiCard
                          label="Storage locations"
                          value="3"
                          trend="Monitored"
                          icon={ShieldCheck}
                        />
                      </div>
                      <section className="card inventory-section">
                        <div className="section-heading">
                          <h3>Your inventory</h3>
                          <span className="muted">{filtered.length} items</span>
                        </div>
                        <div className="filters">
                          <label className="input-search">
                            <Search size={17} />
                            <input
                              placeholder="Search food items..."
                              aria-label="Search inventory"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                            />
                          </label>
                          <select
                            aria-label="Category filter"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {[
                              "All categories",
                              "Grains",
                              "Dairy",
                              "Produce",
                              "Prepared",
                            ].map((x) => (
                              <option key={x}>{x}</option>
                            ))}
                          </select>
                          <select
                            aria-label="Expiry filter"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                          >
                            {[
                              "All expiry",
                              "Within 24 hours",
                              "Within 3 days",
                            ].map((x) => (
                              <option key={x}>{x}</option>
                            ))}
                          </select>
                          <select
                            aria-label="Risk filter"
                            value={risk}
                            onChange={(e) => setRisk(e.target.value)}
                          >
                            {[
                              "All risks",
                              "Low",
                              "Medium",
                              "High",
                              "Critical",
                            ].map((x) => (
                              <option key={x}>{x}</option>
                            ))}
                          </select>
                          <button
                            className="text-button"
                            onClick={() => {
                              setQuery("");
                              setCategory("All categories");
                              setRisk("All risks");
                              setExpiry("All expiry");
                            }}
                          >
                            Reset
                          </button>
                        </div>
                        <InventoryTable
                          items={filtered}
                          onAction={inventoryAction}
                        />
                      </section>
                    </>
                  }
                />
                <Route
                  path="/surplus"
                  element={
                    <>
                      <PageHeader
                        eyebrow="PREDICT. PREVENT. REDISTRIBUTE."
                        title="AI Surplus Detection"
                        subtitle="Turn early signals into timely action. Stay one step ahead of food waste."
                      />
                      <div className="three-col">
                        <KpiCard
                          label="Predicted food surplus"
                          value="126"
                          unit="kg"
                          trend="12% less"
                          icon={Sparkles}
                          tone="peach"
                        />
                        <KpiCard
                          label="Current surplus"
                          value="30"
                          unit="kg"
                          trend="Ready to rescue"
                          icon={Package}
                        />
                        <KpiCard
                          label="Potential waste"
                          value="18"
                          unit="kg"
                          trend="Preventable"
                          icon={Sprout}
                          tone="lavender"
                        />
                      </div>
                      <div className="two-col">
                        <section className="card prediction">
                          <StatusBadge>AI Demo Prediction</StatusBadge>
                          <h2>
                            Good food.
                            <br />A new opportunity.
                          </h2>
                          <p>
                            <strong>18 kg cooked rice</strong> predicted to
                            become surplus in 2 hours.
                          </p>
                          <div className="confidence">
                            <span>Prediction confidence</span>
                            <strong>92%</strong>
                          </div>
                          <div className="progress">
                            <i style={{ width: "92%" }} />
                          </div>
                          <p>
                            Recommended action: match with a nearby community
                            kitchen.
                          </p>
                          <button
                            className="button primary"
                            onClick={() => navigate("/redistribution")}
                          >
                            Find the right recipient <ArrowRight size={16} />
                          </button>
                        </section>
                        <ChartCard
                          title="Today's food balance"
                          subtitle="Prepared, consumed, surplus and redistributed · kg"
                        >
                          <ResponsiveContainer width="100%" height={285}>
                            <BarChart
                              data={[
                                { name: "Prepared", kg: 370 },
                                { name: "Consumed", kg: 244 },
                                { name: "Surplus", kg: 126 },
                                { name: "Redistributed", kg: 94 },
                              ]}
                            >
                              <CartesianGrid vertical={false} />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar
                                dataKey="kg"
                                fill="#286149"
                                radius={[6, 6, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartCard>
                      </div>
                      <section className="card reasoning">
                        <Sparkles />
                        <div>
                          <h3>Behind the prediction</h3>
                          <p>
                            Today's attendance is 12% lower than the historical
                            average. Current production therefore exceeds
                            predicted demand. The lunch service pattern suggests
                            18 kg of cooked rice may remain after 2 PM.
                          </p>
                          <small>
                            Prototype reasoning from mock attendance and
                            consumption data. No live AI model is connected.
                          </small>
                        </div>
                      </section>
                    </>
                  }
                />
                <Route
                  path="/redistribution"
                  element={
                    <>
                      <PageHeader
                        eyebrow="GOOD FOOD. THE RIGHT DESTINATION."
                        title="Make the next connection."
                        subtitle="Match your surplus with nearby communities, one thoughtful delivery at a time."
                      />
                      <div className="tabs">
                        {["Overview", "Assigned food"].map((t) => (
                          <button
                            className={tab === t ? "active" : ""}
                            key={t}
                            onClick={() => setTab(t)}
                          >
                            {t}
                            {t === "Assigned food" &&
                              ` (${Object.keys(assignments).length})`}
                          </button>
                        ))}
                      </div>
                      {tab === "Assigned food" ? (
                        <section className="card">
                          {Object.keys(assignments).length ? (
                            Object.entries(assignments).map(([food, ngo]) => (
                              <div className="alert-row" key={food}>
                                <HeartHandshake />
                                <div>
                                  <strong>{food}</strong>
                                  <p>Assigned to {ngo}</p>
                                </div>
                                <StatusBadge>Assigned</StatusBadge>
                              </div>
                            ))
                          ) : (
                            <div className="empty">
                              <HeartHandshake />
                              <h3>Your next connection starts here</h3>
                              <p>
                                Select surplus food and assign a compatible
                                recipient.
                              </p>
                              <button
                                className="button primary"
                                onClick={() => setTab("Overview")}
                              >
                                Explore recipients
                              </button>
                            </div>
                          )}
                        </section>
                      ) : (
                        <div className="redistribution-layout">
                          <div>
                            <div className="section-heading">
                              <h3>Available surplus</h3>
                              <StatusBadge>2 batches</StatusBadge>
                            </div>
                            {["Cooked Rice", "Vegetable Curry"].map(
                              (food, i) => (
                                <SurplusCard
                                  key={food}
                                  name={food}
                                  quantity={i ? "12 kg" : "18 kg"}
                                  selected={selectedFood === food}
                                  onClick={() => setSelectedFood(food)}
                                />
                              ),
                            )}
                            <p className="muted small">
                              Selected: {selectedFood}
                            </p>
                          </div>
                          <div>
                            <div className="section-heading">
                              <h3>Recommended Recipients</h3>
                              <span className="ai-matching">
                                <Sparkles size={15} /> Demo AI matching
                              </span>
                            </div>
                            {ngos.map((ngo) => (
                              <NGOCard
                                key={ngo.name}
                                ngo={ngo}
                                assigned={
                                  assignments[selectedFood] === ngo.name
                                }
                                onAssign={() =>
                                  setModal({
                                    type: "Assign surplus",
                                    ngo: ngo.name,
                                  })
                                }
                                onSchedule={() => {
                                  if (ngo.name === "Food Bank B")
                                    setModal({
                                      type: "Assign surplus",
                                      ngo: ngo.name,
                                    });
                                  else
                                    setModal({
                                      type: "Schedule pickup",
                                      ngo: ngo.name,
                                    });
                                }}
                                onRoute={() => {
                                  if (ngo.name === "Community Kitchen A")
                                    navigate("/logistics");
                                  else
                                    setModal({
                                      type: "Route preview",
                                      ngo: ngo.name,
                                    });
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  }
                />
                <Route
                  path="/logistics"
                  element={
                    <>
                      <PageHeader
                        eyebrow="LESS DISTANCE. MORE IMPACT."
                        title="Smart logistics"
                        subtitle="Bring your food rescue journey together, from kitchen to community."
                      />
                      <div className="logistics-layout">
                        <ChartCard
                          title="Your food's next chapter"
                          subtitle="Bengaluru · Demo delivery route"
                        >
                          <RouteMap destination={deliveryDetails.destination} />
                        </ChartCard>
                        <section className="card logistics-card">
                          <div className="section-heading">
                            <h3>Delivery #FL-2048</h3>
                            <StatusBadge>{pickup}</StatusBadge>
                          </div>
                          {[
                            ["PICKUP", "DSCE Institutional Kitchen"],
                            ["DESTINATION", deliveryDetails.destination],
                          ].map(([label, name]) => (
                            <div className="delivery-stop" key={label}>
                              <span className="icon-box mint">
                                <MapPin size={19} />
                              </span>
                              <div>
                                <small>{label}</small>
                                <strong>{name}</strong>
                              </div>
                            </div>
                          ))}
                          <div className="delivery-stats">
                            <span>
                              Distance<strong>4.2 km</strong>
                            </span>
                            <span>
                              ETA<strong>18 min</strong>
                            </span>
                            <span>
                              Food
                              <strong>
                                {inventory.find(
                                  (i) => i.name === deliveryDetails.food,
                                )?.quantity || "18 kg"}
                              </strong>
                            </span>
                          </div>
                          <p className="small muted space-top">
                            {deliveryDetails.food} ·{" "}
                            {deliveryDetails.time.replace("T", " at ")}
                          </p>
                          <div className="driver">
                            <span className="avatar">AK</span>
                            <div>
                              <strong>Arjun Kumar</strong>
                              <small>KA 05 · EV 2048 · Electric vehicle</small>
                            </div>
                          </div>
                          <button
                            className="button primary full"
                            disabled={pickup === "Delivered"}
                            onClick={() => {
                              const next =
                                pickup === "Pickup scheduled"
                                  ? "In transit"
                                  : "Delivered";
                              setPickup(next);
                              setToast(`Demo delivery: ${next.toLowerCase()}`);
                            }}
                          >
                            {pickup === "Pickup scheduled"
                              ? "Simulate pickup"
                              : pickup === "In transit"
                                ? "Simulate delivery"
                                : "Delivery completed ✓"}
                          </button>
                        </section>
                      </div>
                      <section className="route-insight">
                        <span className="icon-box mint">
                          <Sparkles />
                        </span>
                        <div>
                          <h3>AI Route Optimization</h3>
                          <p>
                            Route optimized to reduce travel distance by{" "}
                            <strong>18%</strong>. A shorter journey means
                            fresher food and fewer emissions.
                          </p>
                          <small>
                            Simulated route optimization for this prototype.
                          </small>
                        </div>
                        <strong>−0.8 km</strong>
                      </section>
                    </>
                  }
                />
                <Route
                  path="/quality"
                  element={
                    <>
                      <PageHeader
                        eyebrow="FRESHNESS YOU CAN FOLLOW"
                        title="Quality at every step."
                        subtitle="A clear view of storage conditions and food freshness, before every handoff."
                      />
                      <div className="three-col">
                        <KpiCard
                          label="Cold storage · Zone A"
                          value="4.2"
                          unit="°C"
                          trend="Normal"
                          icon={Thermometer}
                        />
                        <KpiCard
                          label="Storage humidity"
                          value="61"
                          unit="%"
                          trend="Normal"
                          icon={Droplets}
                          tone="lavender"
                        />
                        <KpiCard
                          label="Storage status · Zone A"
                          value="Optimal"
                          trend="Stable"
                          icon={ShieldCheck}
                        />
                      </div>
                      <AlertCard {...alerts[3]} />
                      <div className="two-col space-top">
                        <section className="card quality-card">
                          <div className="section-heading">
                            <span className="food-icon">🥛</span>
                            <StatusBadge>Medium</StatusBadge>
                          </div>
                          <h2>Milk Batch #M102</h2>
                          <p>18 L · Cold storage · Expires tomorrow</p>
                          <div className="confidence">
                            <span>Estimated freshness</span>
                            <strong>87%</strong>
                          </div>
                          <div className="progress">
                            <i style={{ width: "87%" }} />
                          </div>
                          <div className="recommendation">
                            <Clock size={19} />
                            <div>
                              <strong>
                                A timely handoff makes all the difference.
                              </strong>
                              <p>Redistribute within 24 hours.</p>
                            </div>
                          </div>
                          <button
                            className="button primary"
                            onClick={() => {
                              setSelectedFood("Fresh Milk");
                              navigate("/redistribution");
                            }}
                          >
                            Review redistribution <ArrowUpRight size={16} />
                          </button>
                        </section>
                        <section className="card quality-card">
                          <div className="section-heading">
                            <h3>Computer Vision Quality Assessment</h3>
                            <Camera size={20} />
                          </div>
                          <div
                            className="produce-visual"
                            role="img"
                            aria-label="Illustrated mock sample of fresh vegetables"
                          >
                            <span>🥦</span>
                            <span>🥕</span>
                            <span>🥬</span>
                          </div>
                          <div className="section-heading">
                            <StatusBadge>AI Demo Prediction</StatusBadge>
                            <strong>96% confidence</strong>
                          </div>
                          <div className="quality-scale">
                            <span className="active">Fresh</span>
                            <span>Quality Risk</span>
                            <span>Spoiled</span>
                          </div>
                          <p className="small muted">
                            Illustrative sample only. No computer vision model
                            or live sensor is connected. This is not a food
                            safety assessment.
                          </p>
                          <button
                            className="button secondary"
                            onClick={() => setModal({ type: "Quality demo" })}
                          >
                            View sample assessment
                          </button>
                        </section>
                      </div>
                    </>
                  }
                />
                <Route
                  path="/analytics"
                  element={<Analytics exportReport={exportReport} />}
                />
                <Route
                  path="/settings"
                  element={
                    <>
                      <PageHeader
                        eyebrow="MAKE FOODLOOP YOURS"
                        title="Workspace settings"
                        subtitle="Manage your institution, preferences, and prototype configuration."
                      />
                      <div className="settings-layout">
                        <div className="settings-tabs">
                          {[
                            "Institution profile",
                            "Notification preferences",
                            "Alert thresholds",
                            "User management",
                            "API / AI configuration",
                          ].map((t) => (
                            <button
                              className={settingsTab === t ? "active" : ""}
                              key={t}
                              onClick={() => setSettingsTab(t)}
                            >
                              {t}
                              <ArrowRight size={15} />
                            </button>
                          ))}
                        </div>
                        <section className="card settings-content">
                          <h2>{settingsTab}</h2>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              localStorage.setItem(
                                "foodloop-settings",
                                JSON.stringify(settings),
                              );
                              setInstitution(settings.name);
                              setToast("Settings saved on this device");
                            }}
                          >
                            {settingsTab === "Institution profile" ? (
                              <>
                                <p>
                                  Your organization details for the demo
                                  workspace.
                                </p>
                                <label>
                                  Institution name
                                  <input
                                    required
                                    value={settings.name}
                                    onChange={(e) =>
                                      setSettings({
                                        ...settings,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  Contact email
                                  <input
                                    required
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) =>
                                      setSettings({
                                        ...settings,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  Institution type
                                  <select
                                    value={
                                      settings.type || "Institutional kitchen"
                                    }
                                    onChange={(e) =>
                                      setSettings({
                                        ...settings,
                                        type: e.target.value,
                                      })
                                    }
                                  >
                                    <option>Institutional kitchen</option>
                                    <option>Food processing unit</option>
                                    <option>NGO / Food bank</option>
                                  </select>
                                </label>
                              </>
                            ) : settingsTab === "Notification preferences" ? (
                              <>
                                <p>
                                  Choose which in-app alerts appear in this
                                  prototype.
                                </p>
                                <label className="toggle-row">
                                  Expiry and surplus notifications
                                  <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={(e) =>
                                      setSettings({
                                        ...settings,
                                        notifications: e.target.checked,
                                      })
                                    }
                                  />
                                </label>
                                <p className="small muted">
                                  Preferences are saved locally. Email and push
                                  delivery are not connected.
                                </p>
                              </>
                            ) : settingsTab === "Alert thresholds" ? (
                              <>
                                <p>
                                  Configure your demo cold-storage warning
                                  threshold.
                                </p>
                                <label>
                                  Temperature threshold (°C)
                                  <input
                                    required
                                    type="number"
                                    min="0"
                                    max="20"
                                    value={settings.threshold}
                                    onChange={(e) =>
                                      setSettings({
                                        ...settings,
                                        threshold: e.target.value,
                                      })
                                    }
                                  />
                                </label>
                                <p className="small muted">
                                  Configuration only; sensor data is simulated.
                                </p>
                              </>
                            ) : settingsTab === "User management" ? (
                              <>
                                <div className="driver">
                                  <span className="avatar">AD</span>
                                  <div>
                                    <strong>Admin</strong>
                                    <small>{settings.email}</small>
                                  </div>
                                  <StatusBadge>Administrator</StatusBadge>
                                </div>
                                <p>
                                  This prototype includes one local
                                  administrator. Authentication and invitations
                                  are not connected.
                                </p>
                              </>
                            ) : (
                              <>
                                <StatusBadge>Demo mode</StatusBadge>
                                <p>
                                  Demand forecasting, recipient matching, and
                                  quality assessments use local mock data. No
                                  external API or AI model is connected.
                                </p>
                                <label>
                                  Prediction mode
                                  <select disabled>
                                    <option>Local demo data</option>
                                  </select>
                                </label>
                              </>
                            )}
                            {![
                              "User management",
                              "API / AI configuration",
                            ].includes(settingsTab) && (
                              <button className="button primary" type="submit">
                                Save changes <Check size={16} />
                              </button>
                            )}
                          </form>
                        </section>
                      </div>
                    </>
                  }
                />
                <Route
                  path="*"
                  element={
                    <div className="empty">
                      <h1>Let's get you back in the loop.</h1>
                      <Link className="button primary" to="/dashboard">
                        Open dashboard
                      </Link>
                    </div>
                  }
                />
              </Routes>
              <div className="workspace-footer">
                <span>
                  <Leaf size={13} /> A little less waste. A little more good.
                </span>
                <span>FoodLoop AI · Prototype · All data is simulated</span>
              </div>
            </main>
          </div>
        </div>
      )}
      {modal && (
        <Modal title={modal.type} onClose={() => setModal(null)}>
          {modal.type === "Add inventory" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                setInventory([
                  ...inventory,
                  {
                    id: Date.now(),
                    name: String(f.get("name")),
                    quantity: `${f.get("quantity")} ${f.get("unit")}`,
                    category: String(f.get("category")),
                    days: Number(f.get("days")),
                    expiry: `In ${f.get("days")} days`,
                    storage: String(f.get("storage")),
                    quality: "Good",
                    risk: Number(f.get("days")) <= 1 ? "High" : "Low",
                    emoji: "📦",
                  },
                ]);
                setModal(null);
                setToast("Food batch added to inventory");
              }}
            >
              <label>
                Food item
                <input name="name" required placeholder="e.g. Fresh tomatoes" />
              </label>
              <div className="two-col">
                <label>
                  Quantity
                  <input
                    name="quantity"
                    type="number"
                    min="0.1"
                    step="0.1"
                    required
                  />
                </label>
                <label>
                  Unit
                  <select name="unit">
                    <option>kg</option>
                    <option>L</option>
                    <option>meals</option>
                  </select>
                </label>
              </div>
              <label>
                Category
                <select name="category">
                  {["Produce", "Grains", "Dairy", "Prepared"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                Days until expiry
                <input name="days" type="number" required min="0" max="365" />
              </label>
              <label>
                Storage
                <select name="storage">
                  <option>Cold storage</option>
                  <option>Dry storage</option>
                  <option>Kitchen 01</option>
                </select>
              </label>
              <button className="button primary full">Add food batch</button>
            </form>
          ) : modal.type === "Assign surplus" ? (
            <>
              <p>
                Connect <strong>{selectedFood}</strong> with{" "}
                <strong>{modal.ngo}</strong>.
              </p>
              {modal.ngo === "Food Bank B" ? (
                <div className="recommendation">
                  <p>
                    This recipient accepts packaged food only. Select Community
                    Kitchen A or Shelter C for the current food selection.
                  </p>
                </div>
              ) : (
                <>
                  <p className="recommendation">
                    Demo match based on distance, capacity, and food
                    preferences. Confirm quality before a real handoff.
                  </p>
                  <button
                    className="button primary full"
                    onClick={() => {
                      setAssignments({
                        ...assignments,
                        [selectedFood]: modal.ngo!,
                      });
                      setModal(null);
                      setToast("Surplus assigned successfully");
                    }}
                  >
                    Confirm assignment <Check size={17} />
                  </button>
                </>
              )}
            </>
          ) : modal.type === "Schedule pickup" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const date = String(
                  new FormData(e.currentTarget).get("pickup"),
                );
                setPickup("Pickup scheduled");
                setDeliveryDetails({
                  destination: modal.ngo!,
                  food: selectedFood,
                  time: date,
                });
                setModal(null);
                setToast(
                  `Demo pickup scheduled for ${modal.ngo}: ${date.replace("T", " ")}`,
                );
              }}
            >
              <p>
                Schedule <strong>{selectedFood}</strong> for {modal.ngo}.
              </p>
              <label>
                Pickup date and time
                <input
                  type="datetime-local"
                  name="pickup"
                  defaultValue="2026-09-28T14:30"
                  min="2026-09-28T00:00"
                  required
                />
              </label>
              <button className="button primary full">
                Schedule demo pickup
              </button>
            </form>
          ) : modal.type === "View" ? (
            <>
              <div className="food-cell">
                <span className="food-icon">{modal.item?.emoji}</span>
                <h3>{modal.item?.name}</h3>
              </div>
              <p>Quantity: {modal.item?.quantity}</p>
              <p>Storage: {modal.item?.storage}</p>
              <p>Expiry: {modal.item?.expiry}</p>
              <StatusBadge>{modal.item?.risk}</StatusBadge>
            </>
          ) : ["Mark as Used", "Report Waste"].includes(modal.type) ? (
            <>
              <p>
                {modal.type === "Mark as Used" ? "Mark" : "Report"}{" "}
                <strong>
                  {modal.item?.quantity} of {modal.item?.name}
                </strong>{" "}
                as {modal.type === "Mark as Used" ? "used" : "waste"}? This will
                remove this batch from active inventory.
              </p>
              <button
                className="button primary full"
                onClick={() => {
                  setInventory(
                    inventory.filter((i) => i.id !== modal.item?.id),
                  );
                  setToast(
                    `${modal.item?.name} ${modal.type === "Mark as Used" ? "marked as used" : "reported as waste"}`,
                  );
                  setModal(null);
                }}
              >
                Confirm {modal.type.toLowerCase()}
              </button>
            </>
          ) : modal.type === "Route preview" ? (
            <>
              <p>
                <strong>{institution}</strong> → <strong>{modal.ngo}</strong>
              </p>
              <p>
                Direct distance:{" "}
                {ngos.find((n) => n.name === modal.ngo)?.distance}. A live route
                service is not connected in this prototype.
              </p>
              <StatusBadge>Demo route preview</StatusBadge>
            </>
          ) : (
            <>
              <div className="produce-visual">🥦 🥕 🥬</div>
              <p>
                <strong>Sample result: Fresh · 96% confidence.</strong>
              </p>
              <p>
                Simulated output for demonstration only. No image was analyzed.
              </p>
            </>
          )}
        </Modal>
      )}
      <Toast message={toast} />
    </>
  );
}
