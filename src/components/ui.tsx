import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Leaf, Sparkles, ArrowUpRight, X, CheckCircle2 } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { forecast, alerts } from "../data/dashboardData";
import { ngos } from "../data/ngoData";
export const Brand = () => (
  <Link className="brand" to="/">
    <span className="brand-icon">
      <Leaf size={23} />
    </span>
    <span>
      FoodLoop<span className="ai">AI</span>
      <small>TURNING SURPLUS INTO IMPACT</small>
    </span>
  </Link>
);
export const StatusBadge = ({ children }: { children: ReactNode }) => (
  <span
    className={"badge " + String(children).toLowerCase().replaceAll(" ", "-")}
  >
    {children}
  </span>
);
export function PageHeader({
  title,
  subtitle,
  action,
  eyebrow = "FOODLOOP WORKSPACE",
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="page-header">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
export function KpiCard({
  label,
  value,
  unit,
  trend,
  icon: Icon = Leaf,
  tone = "mint",
}: {
  label: string;
  value: string;
  unit?: string;
  trend: string;
  icon?: typeof Leaf;
  tone?: string;
}) {
  return (
    <div className="kpi card">
      <div className="kpi-top">
        <span className={"icon-box " + tone}>
          <Icon size={20} />
        </span>
        <span className="muted">↗</span>
      </div>
      <p>{label}</p>
      <div className="kpi-value">
        {value} <span>{unit}</span>
      </div>
      <small>
        <span className="trend">↗ {trend}</span> <span>vs. last week</span>
      </small>
    </div>
  );
}
export const MetricCard = KpiCard;
export function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="card chart-card">
      <div className="section-heading">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <span className="muted">···</span>
      </div>
      {children}
    </section>
  );
}
export function AIInsightCard() {
  return (
    <section className="insight">
      <div className="insight-label">
        <Sparkles size={19} /> AI Recommendations{" "}
        <span className="live-dot">● Live demo</span>
      </div>
      <h2>
        A little less waste.
        <br />A lot more possibility.
      </h2>
      <p>
        Today's demand is lower than usual. A few small adjustments can make a
        big difference.
      </p>
      {[
        [
          "Fine-tune your lunch production",
          "Reduce production by approximately 8% based on today’s consumption pattern.",
        ],
        [
          "Get ahead of the afternoon surplus",
          "32 kg of cooked food may become surplus between 2:00–4:00 PM.",
        ],
        [
          "Give good food a second destination",
          "3 inventory items need redistribution within 24 hours.",
        ],
      ].map(([a, b], i) => (
        <div className="insight-item" key={a}>
          <span>0{i + 1}</span>
          <div>
            <strong>{a}</strong>
            <p>{b}</p>
          </div>
        </div>
      ))}
      <Link to="/surplus" className="insight-link">
        Explore recommendations <ArrowUpRight size={18} />
      </Link>
      <small className="demo-note">Simulated insights · demo data</small>
    </section>
  );
}
export const AlertCard = ({ title, detail, kind }: (typeof alerts)[number]) => (
  <div className="alert-row">
    <span className={"alert-dot " + kind.toLowerCase()} />
    <div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </div>
    <StatusBadge>{kind}</StatusBadge>
  </div>
);
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const dialog = document.querySelector<HTMLDivElement>(".modal");
    dialog?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const elements = dialog?.querySelectorAll<HTMLElement>(
          "button,input,select",
        );
        if (!elements?.length) return;
        const first = elements[0],
          last = elements[elements.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === dialog)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, []);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="section-heading">
          <h2>{title}</h2>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export const Toast = ({ message }: { message: string }) =>
  message ? (
    <div className="toast" role="status">
      <CheckCircle2 size={19} />
      {message}
    </div>
  ) : null;
export function ForecastChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={forecast}
        margin={{ top: 15, right: 15, left: -22, bottom: 0 }}
      >
        <defs>
          <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f9775" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#4f9775" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 5"
          vertical={false}
          stroke="#eceee9"
        />
        <XAxis dataKey="day" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="actual"
          name="Actual consumption"
          stroke="#1e654b"
          strokeWidth={2.5}
          fill="url(#chartGreen)"
        />
        <Area
          type="monotone"
          dataKey="predicted"
          name="Predicted demand"
          stroke="#93b573"
          strokeDasharray="5 5"
          strokeWidth={2}
          fill="transparent"
        />
        <Area
          type="monotone"
          dataKey="surplus"
          name="Predicted surplus"
          stroke="#d5a765"
          fill="#fcf4e6"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
export function WasteChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={forecast} barGap={3}>
        <CartesianGrid vertical={false} stroke="#eef0ea" />
        <XAxis dataKey="day" axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip />
        <Legend iconType="circle" iconSize={7} />
        {[
          ["prepared", "Prepared", "#dce7d8"],
          ["consumed", "Consumed", "#22634b"],
          ["wasted", "Wasted", "#e1b36f"],
          ["redistributed", "Redistributed", "#9bbf7d"],
        ].map(([key, name, fill]) => (
          <Bar
            key={key}
            dataKey={key}
            name={name}
            fill={fill}
            radius={[3, 3, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
