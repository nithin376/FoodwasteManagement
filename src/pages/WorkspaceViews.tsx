import {
  Leaf,
  HeartHandshake,
  Truck,
  Search,
  ArrowUpRight,
  Check,
  Clock,
  MapPin,
  Utensils,
  Sprout,
  Wallet,
  Download,
  Droplets,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";
import { type Food } from "../data/inventoryData";
import { ngos } from "../data/ngoData";
import { monthly, categories } from "../data/analyticsData";
import { StatusBadge, PageHeader, KpiCard, ChartCard } from "../components/ui";
export function InventoryTable({
  items,
  onAction,
}: {
  items: Food[];
  onAction: (action: string, item: Food) => void;
}) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {[
              "Food item",
              "Quantity",
              "Expiry",
              "Storage",
              "Quality",
              "Waste risk",
              "Action",
            ].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="food-cell">
                  <span className="food-icon">{item.emoji}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <small>
                      {item.category} · #FL{item.id}
                    </small>
                  </div>
                </div>
              </td>
              <td>
                <strong>{item.quantity}</strong>
              </td>
              <td>
                {item.expiry}
                <small className={item.days < 2 ? "urgent" : ""}>
                  {item.days === 0
                    ? "Use today"
                    : `${item.days} days remaining`}
                </small>
              </td>
              <td>{item.storage}</td>
              <td>
                <StatusBadge>{item.quality}</StatusBadge>
              </td>
              <td>
                <StatusBadge>{item.risk}</StatusBadge>
              </td>
              <td>
                <select
                  aria-label={`Action for ${item.name}`}
                  value=""
                  onChange={(e) => onAction(e.target.value, item)}
                >
                  <option value="">Manage</option>
                  <option>View</option>
                  <option>Redistribute</option>
                  <option>Mark as Used</option>
                  <option>Report Waste</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!items.length && (
        <div className="empty">
          <Search />
          <h3>No matching inventory</h3>
          <p>Try another search or reset your filters.</p>
        </div>
      )}
    </div>
  );
}
export function SurplusCard({
  name,
  quantity,
  selected,
  onClick,
}: {
  name: string;
  quantity: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={"surplus-card card " + (selected ? "selected" : "")}
      onClick={onClick}
    >
      <div className="section-heading">
        <span className="food-icon">{name.includes("Rice") ? "🍚" : "🥘"}</span>
        <span className="selection-circle">
          {selected && <Check size={13} />}
        </span>
      </div>
      <h3>{name}</h3>
      <strong className="big-number">{quantity}</strong>
      <p>
        <span className="green-dot" /> Ready for pickup
      </p>
      <small>
        <Clock size={14} /> Use within {name.includes("Rice") ? "4" : "6"} hours
      </small>
    </button>
  );
}
export function NGOCard({
  ngo,
  onAssign,
  onSchedule,
  onRoute,
  assigned,
}: {
  ngo: (typeof ngos)[number];
  onAssign: () => void;
  onSchedule: () => void;
  onRoute: () => void;
  assigned: boolean;
}) {
  return (
    <article className="card ngo-card">
      <div className="section-heading">
        <span className={"ngo-avatar " + ngo.color}>{ngo.initials}</span>
        <span className="match">{ngo.match}% Match</span>
      </div>
      <h3>{ngo.name}</h3>
      <p>
        <MapPin size={14} /> {ngo.distance} away · Accepts{" "}
        {ngo.accepts.toLowerCase()}
      </p>
      <div className="ngo-details">
        <span>
          Capacity <strong>{ngo.capacity} meals</strong>
        </span>
        <span className="trend">● Pickup available</span>
      </div>
      <div className="ngo-actions">
        <button className="button primary" onClick={onAssign}>
          {assigned ? "Assigned ✓" : "Assign Food"}
        </button>
        <button className="button secondary" onClick={onSchedule}>
          Schedule Pickup
        </button>
        <button className="text-button" onClick={onRoute}>
          View Route <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}
export function RouteMap({ destination }: { destination: string }) {
  return (
    <div className="route-map">
      <div className="map-label l1">BANASHANKARI</div>
      <div className="map-label l2">KUMARASWAMY LAYOUT</div>
      <div className="map-park p1">
        Neighborhood
        <br />
        park
      </div>
      <div className="map-park p2">Green space</div>
      <svg
        viewBox="0 0 700 430"
        preserveAspectRatio="none"
        aria-label="Illustrative delivery route"
      >
        <path
          className="map-road"
          d="M-10 100 L710 330 M-10 350 L700 80 M150 -10 L350 440 M490 -10 L550 440 M0 240 L700 210"
        />
        <path
          className="route-line"
          d="M170 290 L290 250 L370 275 L490 165 L535 180"
        />
        <circle
          cx="170"
          cy="290"
          r="9"
          fill="#225e46"
          stroke="white"
          strokeWidth="4"
        />
        <circle
          cx="535"
          cy="180"
          r="9"
          fill="#225e46"
          stroke="white"
          strokeWidth="4"
        />
      </svg>
      <div className="map-pin source">
        <Utensils size={16} />
        <strong>DSCE Kitchen</strong>
      </div>
      <div className="map-pin destination">
        <HeartHandshake size={16} />
        <strong>{destination}</strong>
      </div>
      <div className="vehicle-pin">
        <Truck size={19} />
      </div>
      <span className="map-demo">Illustrative route · Not live navigation</span>
      <span className="map-distance">4.2 km · 18 min</span>
    </div>
  );
}
export function Analytics({ exportReport }: { exportReport: () => void }) {
  return (
    <>
      <PageHeader
        eyebrow="YOUR IMPACT, MADE VISIBLE"
        title="A better footprint starts here."
        subtitle="See how small, everyday decisions add up to meaningful, lasting change."
        action={
          <button className="button primary" onClick={exportReport}>
            <Download size={17} />
            Export report
          </button>
        }
      />
      <div className="kpi-grid">
        <KpiCard
          label="Food waste prevented"
          value="680"
          unit="kg"
          trend="32%"
          icon={Sprout}
        />
        <KpiCard
          label="Food redistributed"
          value="1,240"
          unit="kg"
          trend="18.6%"
          icon={HeartHandshake}
        />
        <KpiCard
          label="Estimated CO₂ avoided"
          value="1.8"
          unit="tonnes"
          trend="24%"
          icon={Leaf}
        />
        <KpiCard
          label="Water saved"
          value="420,000"
          unit="L"
          trend="12%"
          icon={Droplets}
          tone="lavender"
        />
        <KpiCard
          label="Cost savings"
          value="₹84,500"
          trend="16%"
          icon={Wallet}
          tone="sand"
        />
      </div>
      <div className="two-col">
        {[
          ["Monthly food waste reduction", "waste", "kg"],
          ["Food redistribution trend", "redistributed", "kg"],
          ["Carbon footprint reduction", "carbon", "tonnes"],
          ["Resource efficiency", "efficiency", "%"],
        ].map(([title, key, unit]) => (
          <ChartCard
            key={key}
            title={title}
            subtitle={`April – September 2026 · ${unit}`}
          >
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthly} margin={{ left: -20, right: 15 }}>
                <CartesianGrid vertical={false} stroke="#eceee9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={key}
                  name={title}
                  stroke="#28674f"
                  fill="#e5efdf"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        ))}
      </div>
      <div className="two-col space-top">
        <ChartCard
          title="Waste by category"
          subtitle="Share of recorded demo waste"
        >
          <div className="pie-layout">
            <ResponsiveContainer width="55%" height={210}>
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div>
              {categories.map((c) => (
                <p key={c.name}>
                  <i className="legend-dot" style={{ background: c.fill }} />
                  {c.name} <strong>{c.value}%</strong>
                </p>
              ))}
            </div>
          </div>
        </ChartCard>
        <ChartCard
          title="Current Sustainability Performance"
          subtitle="Your ESG snapshot · Demo scores"
        >
          <div className="rings">
            {[
              ["Food waste reduction", 78],
              ["Redistribution rate", 64],
              ["Resource efficiency", 82],
            ].map(([label, val]) => (
              <div key={label}>
                <div
                  className="ring"
                  style={{
                    background: `conic-gradient(#276149 ${val}%, #ecf0e7 0)`,
                  }}
                >
                  <span>{val}%</span>
                </div>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </>
  );
}
