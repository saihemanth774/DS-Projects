/* DATA//LAB — app.js (vanilla JS, no build step) */
(function () {
  'use strict';

  /* ---------- DATA ---------- */
  const MODULES = [
    { n: '01', title: 'INTRODUCTION TO DATA SCIENCE', desc: 'Understand the foundations, lifecycle and applications of Data Science.', progress: 68, time: '6 hrs',
      objectives: ['Understand Data Science', 'Learn the Data Science lifecycle', 'Identify real-world applications', 'Understand AI vs ML vs Data Science'],
      topics: ['What is Data Science?', 'History & evolution', 'The DS lifecycle', 'Roles in a data team', 'Data types & structures', 'Structured vs unstructured data', 'AI vs ML vs DS', 'Real-world applications', 'Ethics & privacy', 'Problem framing', 'Tools overview', 'Case study: churn prediction'], done: 8 },
    { n: '02', title: 'DATA EXTRACTION', desc: 'Collect data from files, APIs, databases and the web.', progress: 52, time: '5 hrs',
      objectives: ['Read CSV, JSON and Excel files', 'Query data with SQL', 'Consume REST APIs', 'Understand ethical web scraping'],
      topics: ['File formats', 'Reading CSV with Pandas', 'Working with JSON', 'SQLite basics', 'SQL SELECT & JOIN', 'REST APIs', 'Web scraping basics', 'Data licensing'], done: 4 },
    { n: '03', title: 'DATA CLEANING', desc: 'Handle missing values, outliers and inconsistent data with confidence.', progress: 40, time: '6 hrs',
      objectives: ['Detect and impute missing values', 'Remove duplicates', 'Treat outliers', 'Standardise formats and types'],
      topics: ['Why data is dirty', 'Missing values', 'Imputation strategies', 'Duplicates', 'Data type conversion', 'String cleaning', 'Outlier detection (IQR)', 'Z-score method', 'Encoding categoricals', 'Feature scaling'], done: 4 },
    { n: '04', title: 'DATA VISUALIZATION', desc: 'Tell clear stories with charts using Matplotlib and Seaborn.', progress: 25, time: '5 hrs',
      objectives: ['Choose the right chart', 'Build plots with Matplotlib', 'Create statistical plots with Seaborn', 'Design for clarity'],
      topics: ['Principles of visual design', 'Line & bar charts', 'Histograms', 'Scatter plots', 'Box & violin plots', 'Heatmaps', 'Subplots & layouts', 'Seaborn themes', 'Dashboard thinking'], done: 2 },
    { n: '05', title: 'STATISTICAL THINKING', desc: 'Reason about uncertainty, distributions and relationships in data.', progress: 12, time: '8 hrs',
      objectives: ['Summarise data with statistics', 'Understand distributions', 'Run hypothesis tests', 'Measure correlation'],
      topics: ['Mean, median, mode', 'Variance & std deviation', 'Probability basics', 'Normal distribution', 'Sampling', 'Central limit theorem', 'Confidence intervals', 'Hypothesis testing', 'p-values', 'Correlation vs causation', 'A/B testing'], done: 1 },
    { n: '06', title: 'MACHINE LEARNING', desc: 'Train, evaluate and tune regression and classification models.', progress: 0, time: '12 hrs',
      objectives: ['Distinguish supervised and unsupervised learning', 'Train regression models', 'Build classifiers', 'Evaluate with proper metrics'],
      topics: ['ML landscape', 'Train/test split', 'Linear regression', 'Logistic regression', 'Decision trees', 'Random forests', 'k-NN', 'k-Means clustering', 'Overfitting & bias-variance', 'Cross-validation', 'Accuracy, precision, recall', 'ROC & AUC', 'Hyper-parameter tuning', 'Model deployment basics'], done: 0 },
    { n: '07', title: 'TIME SERIES ANALYSIS', desc: 'Model trends, seasonality and forecast the future.', progress: 0, time: '7 hrs',
      objectives: ['Parse and index datetime data', 'Decompose trend and seasonality', 'Smooth and forecast', 'Evaluate forecasts'],
      topics: ['Datetime handling', 'Resampling', 'Rolling windows', 'Trend & seasonality', 'Stationarity', 'Moving averages', 'ARIMA basics', 'Forecast evaluation'], done: 0 }
  ];

  const REG = `import pandas as pd
from sklearn.linear_model import LinearRegression`;
  const EXPERIMENTS = [
    { n: '01', title: 'CSV Data Loading & Analysis', short: 'CSV DATA LOADING', diff: 'BEGINNER', tech: 'Python + Pandas', status: 'COMPLETED',
      obj: 'Load a CSV file into a DataFrame and inspect its structure, types and summary statistics.',
      steps: ['Import pandas', 'Read the CSV with read_csv()', 'Preview rows with head()', 'Inspect shape, dtypes and describe()'],
      code: `import pandas as pd

data = pd.read_csv("dataset.csv")
print(data.head())
print(data.shape)
print(data.describe())`,
      out: `   id  age  income  churn
0   1   34   52000      0
1   2   45   78000      1
2   3   29   41000      0
3   4   52   99000      0
4   5   38   61000      1
(42580, 18)
              age        income
count  42580.0000  42580.000000
mean      38.4120  58210.350000
std       11.2300  18340.120000
min       18.0000  12000.000000` },
    { n: '02', title: 'JSON Data Processing', short: 'JSON PROCESSING', diff: 'BEGINNER', tech: 'Python + json + Pandas', status: 'COMPLETED',
      obj: 'Parse nested JSON and flatten it into a tabular DataFrame.',
      steps: ['Load JSON with json.load()', 'Normalise nested records', 'Rename columns', 'Export to CSV'],
      code: `import json
import pandas as pd

with open("users.json") as f:
    raw = json.load(f)

df = pd.json_normalize(raw["users"])
print(df.head(3))`,
      out: `   id   name  address.city  address.zip
0   1  Asha     Hyderabad       500081
1   2  Ravi     Chennai         600001
2   3  Meera    Bengaluru       560001` },
    { n: '03', title: 'Data Cleaning', short: 'DATA CLEANING', diff: 'BEGINNER', tech: 'Python + Pandas', status: 'COMPLETED',
      obj: 'Fix missing values, duplicates and wrong types to produce an analysis-ready dataset.',
      steps: ['Count nulls per column', 'Impute with median', 'Drop duplicates', 'Cast columns to correct types'],
      code: `import pandas as pd

df = pd.read_csv("dataset.csv")
print(df.isna().sum())

df["age"] = df["age"].fillna(df["age"].median())
df = df.drop_duplicates()
print("clean rows:", len(df))`,
      out: `age        412
income     198
city         0
dtype: int64
clean rows: 42580` },
    { n: '04', title: 'Exploratory Data Analysis', short: 'EXPLORATORY ANALYSIS', diff: 'BEGINNER', tech: 'Python + Pandas + Seaborn', status: 'COMPLETED',
      obj: 'Discover patterns, distributions and anomalies before modelling.',
      steps: ['Summarise numeric features', 'Count categorical values', 'Group and aggregate', 'Plot distributions'],
      code: `import pandas as pd

df = pd.read_csv("dataset.csv")
print(df["city"].value_counts().head())
print(df.groupby("churn")["income"].mean())`,
      out: `Hyderabad    9120
Bengaluru    8744
Chennai      7310
Mumbai       6902
Delhi        5821
Name: city, dtype: int64
churn
0    59420.18
1    54110.77` },
    { n: '05', title: 'Data Visualization', short: 'DATA VISUALIZATION', diff: 'INTERMEDIATE', tech: 'Python + Matplotlib', status: 'COMPLETED',
      obj: 'Create clear, labelled charts that communicate a finding.',
      steps: ['Prepare data', 'Create a figure and axes', 'Plot and label', 'Save the figure'],
      code: `import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
sales  = [120, 150, 170, 160, 210]

plt.plot(months, sales, marker="o")
plt.title("Monthly Sales")
plt.savefig("sales.png")`,
      out: `<Figure size 640x480 with 1 Axes>
Saved: sales.png (640x480)` },
    { n: '06', title: 'Statistical Analysis', short: 'STATISTICAL ANALYSIS', diff: 'INTERMEDIATE', tech: 'Python + NumPy + SciPy', status: 'COMPLETED',
      obj: 'Compute descriptive statistics and run a two-sample t-test.',
      steps: ['Generate/sample data', 'Compute mean and std', 'Run ttest_ind', 'Interpret the p-value'],
      code: `import numpy as np
from scipy import stats

a = np.random.normal(50, 5, 200)
b = np.random.normal(52, 5, 200)

t, p = stats.ttest_ind(a, b)
print(f"t={t:.3f}, p={p:.4f}")`,
      out: `t=-4.127, p=0.0000
Result: statistically significant (p < 0.05)` },
    { n: '07', title: 'Correlation Analysis', short: 'CORRELATION', diff: 'INTERMEDIATE', tech: 'Python + Pandas + Seaborn', status: 'READY',
      obj: 'Measure and visualise relationships between numeric features.',
      steps: ['Select numeric columns', 'Compute corr()', 'Render a heatmap', 'Identify strong pairs'],
      code: `import pandas as pd
import seaborn as sns

df = pd.read_csv("dataset.csv")
corr = df[["age", "income", "tenure"]].corr()
print(corr.round(2))
sns.heatmap(corr, annot=True)`,
      out: `         age  income  tenure
age     1.00    0.62    0.48
income  0.62    1.00    0.35
tenure  0.48    0.35    1.00` },
    { n: '08', title: 'Regression Analysis', short: 'REGRESSION', diff: 'INTERMEDIATE', tech: 'Python + Scikit-learn', status: 'READY',
      obj: 'Fit a linear regression model and evaluate it with R² and RMSE.',
      steps: ['Split train/test', 'Fit LinearRegression', 'Predict on test set', 'Report R² and RMSE'],
      code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LinearRegression().fit(X_train, y_train)
print("R2:", r2_score(y_test, model.predict(X_test)))`,
      out: `R2: 0.8641
RMSE: 4120.55
coef_: [ 1.82  0.46 -0.09 ]` },
    { n: '09', title: 'Classification', short: 'CLASSIFICATION', diff: 'ADVANCED', tech: 'Python + Scikit-learn', status: 'READY',
      obj: 'Train a Random Forest classifier and inspect precision, recall and accuracy.',
      steps: ['Encode features', 'Train RandomForest', 'Predict labels', 'Print classification report'],
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

clf = RandomForestClassifier(n_estimators=200, random_state=42)
clf.fit(X_train, y_train)
print(classification_report(y_test, clf.predict(X_test)))`,
      out: `              precision    recall  f1-score   support
           0       0.96      0.97      0.96      6410
           1       0.91      0.88      0.89      2106
    accuracy                           0.95      8516` },
    { n: '10', title: 'Time Series Analysis', short: 'TIME SERIES', diff: 'ADVANCED', tech: 'Python + Pandas + statsmodels', status: 'LOCKED',
      obj: 'Decompose a series into trend and seasonality, then forecast the next periods.',
      steps: ['Parse dates & set index', 'Resample monthly', 'Decompose series', 'Forecast with ARIMA'],
      code: `import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

s = pd.read_csv("sales.csv", parse_dates=["date"], index_col="date")["sales"]
model = ARIMA(s, order=(1, 1, 1)).fit()
print(model.forecast(steps=3))`,
      out: `2026-01-31    214.8
2026-02-28    219.3
2026-03-31    223.1
Freq: M, dtype: float64` }
  ];

  const TOOLS = [
    { name: 'PYTHON', icon: 'code-xml', role: 'Programming Language', cat: 'Language', tags: ['Data Analysis', 'Automation', 'Machine Learning'], desc: 'The core language of data science: readable, versatile and backed by a huge ecosystem.', code: `print("Hello, DATA//LAB")\nsquares = [x**2 for x in range(5)]` },
    { name: 'PANDAS', icon: 'table-2', role: 'Data Manipulation', cat: 'Library', tags: ['DataFrames', 'Cleaning', 'Aggregation'], desc: 'Fast, flexible tabular data structures for loading, cleaning and transforming data.', code: `import pandas as pd\ndf = pd.read_csv("data.csv")\ndf.groupby("city")["sales"].sum()` },
    { name: 'NUMPY', icon: 'grid-3x3', role: 'Numerical Computing', cat: 'Library', tags: ['Arrays', 'Linear Algebra', 'Statistics'], desc: 'N-dimensional arrays and vectorised math: the foundation under most Python data tools.', code: `import numpy as np\na = np.arange(6).reshape(2, 3)\na.mean(axis=0)` },
    { name: 'MATPLOTLIB', icon: 'chart-line', role: 'Visualization Library', cat: 'Visualization', tags: ['Line Charts', 'Bar Charts', 'Figures'], desc: 'The classic plotting library for publication-quality static charts.', code: `import matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [2, 4, 9])\nplt.show()` },
    { name: 'SEABORN', icon: 'chart-scatter', role: 'Statistical Visualization', cat: 'Visualization', tags: ['Heatmaps', 'Distributions', 'Themes'], desc: 'High-level statistical graphics built on Matplotlib with beautiful defaults.', code: `import seaborn as sns\nsns.histplot(df["age"], kde=True)` },
    { name: 'SCIKIT-LEARN', icon: 'brain-circuit', role: 'Machine Learning Library', cat: 'Machine Learning', tags: ['Regression', 'Classification', 'Clustering'], desc: 'Consistent, simple APIs for modelling, preprocessing and evaluation.', code: `from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier().fit(X, y)` },
    { name: 'JUPYTER NOTEBOOK', icon: 'notebook-pen', role: 'Interactive Environment', cat: 'Environment', tags: ['Notebooks', 'Prototyping', 'Reporting'], desc: 'Combine code, output and narrative in one reproducible document.', code: `$ pip install notebook\n$ jupyter notebook` },
    { name: 'SQLITE', icon: 'database', role: 'Embedded Database', cat: 'Database', tags: ['SQL', 'Storage', 'Queries'], desc: 'A zero-config SQL database in a single file: ideal for local analysis.', code: `import sqlite3\ncon = sqlite3.connect("lab.db")\ncon.execute("SELECT COUNT(*) FROM users")` },
    { name: 'GITHUB', icon: 'github', role: 'Version Control & Hosting', cat: 'Environment', tags: ['Git', 'Collaboration', 'Portfolio'], desc: 'Host your projects, track changes and share your work with the world.', code: `$ git add .\n$ git commit -m "Add EDA notebook"\n$ git push origin main` }
  ];

  /* ---------- HELPERS ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icons = () => { try { window.lucide && lucide.createIcons(); } catch (e) { /* icons are decorative */ } };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- MODULES ---------- */
  const modList = $('#modList');
  let modFilter = 'all';
  function renderModules() {
    const q = $('#modSearch').value.trim().toLowerCase();
    const list = MODULES.filter(m => {
      const f = modFilter === 'all' || (modFilter === 'progress' ? m.progress > 0 : m.progress === 0);
      return f && (m.title + m.desc).toLowerCase().includes(q);
    });
    modList.innerHTML = list.map(m => `
      <article class="mod" tabindex="0" role="button" data-n="${m.n}" aria-label="Open module ${m.n} ${esc(m.title)}">
        <div class="no">${m.n}</div>
        <div><h3>${m.title}</h3><p class="desc">${esc(m.desc)}</p></div>
        <div class="meta"><span><b>${m.topics.length} TOPICS</b></span><span><b>${m.progress}% COMPLETE</b></span><div class="pbar"><i data-w="${m.progress}"></i></div></div>
        <span class="open">OPEN MODULE <i data-lucide="arrow-right"></i></span>
      </article>`).join('');
    $('#modEmpty').hidden = list.length > 0;
    icons();
    requestAnimationFrame(() => $$('.pbar i', modList).forEach(i => (i.style.width = i.dataset.w + '%')));
  }
  modList.addEventListener('click', e => { const el = e.target.closest('.mod'); if (el) openModule(el.dataset.n, el); });
  modList.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('mod')) { e.preventDefault(); openModule(e.target.dataset.n, e.target); }
  });
  $('#modSearch').addEventListener('input', renderModules);
  $('#modFilter').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    modFilter = b.dataset.f; $$('#modFilter button').forEach(x => x.classList.toggle('on', x === b)); renderModules();
  });

  /* ---------- MODAL ---------- */
  const overlay = $('#overlay'), mBody = $('#mBody');
  let lastFocus = null;
  function openModal(html, trigger) {
    lastFocus = trigger || document.activeElement;
    mBody.innerHTML = html;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    icons();
    requestAnimationFrame(() => { overlay.classList.add('show'); $('#mClose').focus(); });
  }
  function closeModal() {
    if (overlay.hidden) return;
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.hidden = true; mBody.innerHTML = ''; }, reduce ? 0 : 250);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $('#mClose').addEventListener('click', closeModal);
  overlay.addEventListener('mousedown', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') { // simple focus trap
      const f = $$('button,a[href],textarea,[tabindex]:not([tabindex="-1"])', overlay).filter(x => !x.disabled && x.offsetParent);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  function openModule(n, trigger) {
    const m = MODULES.find(x => x.n === n);
    openModal(`
      <div class="m-no">MODULE ${m.n}</div>
      <h2 id="mTitle">${m.title}</h2>
      <p class="m-desc">${esc(m.desc)}</p>
      <div class="m-meta">
        <div><small>PROGRESS</small><b>${m.progress}%</b></div>
        <div><small>TOPICS</small><b>${m.topics.length}</b></div>
        <div><small>EST. TIME</small><b>${m.time}</b></div>
      </div>
      <div class="m-cols">
        <div><h4>LEARNING OBJECTIVES</h4><ul>${m.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>
        <div><h4>TOPICS · click to mark done</h4><ul class="topics" id="topicList">${m.topics.map((t, i) => `<li class="${i < m.done ? 'done' : ''}" tabindex="0">${esc(t)}</li>`).join('')}</ul></div>
      </div>
      <div class="m-foot">
        <div class="grow"><span id="mProg">${m.progress}% COMPLETE</span><div class="pbar"><i id="mBar" style="width:${m.progress}%"></i></div></div>
        <button class="btn solid" id="startLearn">START LEARNING <i data-lucide="arrow-right"></i></button>
      </div>`, trigger);
    const list = $('#topicList');
    const toggle = li => {
      li.classList.toggle('done');
      const d = $$('li.done', list).length;
      m.done = d; m.progress = Math.round(d / m.topics.length * 100);
      $('#mProg').textContent = m.progress + '% COMPLETE'; $('#mBar').style.width = m.progress + '%';
      const card = $(`.mod[data-n="${m.n}"]`);
      if (card) { card.querySelector('.meta span:nth-child(2) b').textContent = m.progress + '% COMPLETE'; card.querySelector('.pbar i').style.width = m.progress + '%'; }
    };
    list.addEventListener('click', e => { const li = e.target.closest('li'); if (li) toggle(li); });
    list.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.tagName === 'LI') { e.preventDefault(); toggle(e.target); } });
    $('#startLearning, #startLearn').addEventListener('click', () => {
      const next = $$('li', list).find(li => !li.classList.contains('done'));
      if (next) toggle(next);
      const b = $('#startLearn'); b.innerHTML = next ? 'TOPIC COMPLETED ✓' : 'MODULE COMPLETE ✓';
    });
  }

  /* ---------- EXPERIMENTS ---------- */
  const expGrid = $('#expGrid');
  let expFilter = 'all';
  const statusDot = s => `<span class="status s-${s}"><i></i>${s}</span>`;
  function renderExperiments() {
    const q = $('#expSearch').value.trim().toLowerCase();
    const list = EXPERIMENTS.filter(x => (expFilter === 'all' || x.diff === expFilter) && (x.title + x.tech + x.diff).toLowerCase().includes(q));
    expGrid.innerHTML = list.map(x => `
      <article class="exp" tabindex="0" role="button" data-n="${x.n}" aria-label="Open experiment ${x.n} ${esc(x.title)}">
        <div class="exp-top"><small>EXPERIMENT ${x.n}</small>${statusDot(x.status)}</div>
        <h3>${esc(x.short)}</h3>
        <dl><dt>Difficulty</dt><dd class="diff-${x.diff}">${x.diff}</dd><dt>Technology</dt><dd>${esc(x.tech)}</dd><dt>Status</dt><dd>${x.status}</dd></dl>
        <span class="btn ghost">${x.status === 'COMPLETED' ? 'RE-RUN EXPERIMENT' : 'RUN EXPERIMENT'} <i data-lucide="arrow-right"></i></span>
      </article>`).join('');
    $('#expEmpty').hidden = list.length > 0;
    icons();
  }
  expGrid.addEventListener('click', e => { const el = e.target.closest('.exp'); if (el) openLab(el.dataset.n, el); });
  expGrid.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('exp')) { e.preventDefault(); openLab(e.target.dataset.n, e.target); } });
  expGrid.addEventListener('pointermove', e => {
    const c = e.target.closest('.exp'); if (!c) return;
    const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px');
  });
  $('#expSearch').addEventListener('input', renderExperiments);
  $('#expFilter').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    expFilter = b.dataset.f; $$('#expFilter button').forEach(x => x.classList.toggle('on', x === b)); renderExperiments();
  });

  // minimal Python syntax highlighter
  const KW = /^(import|from|as|def|return|if|else|elif|for|in|with|print|class|True|False|None|and|or|not|lambda)$/;
  function highlight(src) {
    const re = /(#.*$)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)(\s*\()?/gm;
    let out = '', last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      if (m[1]) out += `<span class="tk-c">${esc(m[1])}</span>`;
      else if (m[2]) out += `<span class="tk-s">${esc(m[2])}</span>`;
      else if (m[3]) out += `<span class="tk-n">${m[3]}</span>`;
      else if (KW.test(m[4])) out += `<span class="tk-k">${m[4]}</span>${m[5] ? esc(m[5]) : ''}`;
      else if (m[5]) out += `<span class="tk-f">${m[4]}</span>${esc(m[5])}`;
      else out += m[4];
      last = re.lastIndex;
    }
    return out + esc(src.slice(last)) + '\n';
  }

  let runTimer = null;
  function openLab(n, trigger) {
    const x = EXPERIMENTS.find(e => e.n === n);
    const locked = x.status === 'LOCKED';
    openModal(`
      <div class="m-no">EXPERIMENT ${x.n} · ${statusDot(x.status)}</div>
      <h2 id="mTitle">${esc(x.title)}</h2>
      <div class="lab">
        <div class="lab-info">
          <section><h4 class="m-h">OBJECTIVE</h4><p>${esc(x.obj)}</p></section>
          <section><h4 class="m-h">DIFFICULTY</h4><b class="mono diff-${x.diff}">${x.diff}</b></section>
          <section><h4 class="m-h">TECHNOLOGIES</h4><div class="techs">${x.tech.split('+').map(t => `<span>${esc(t.trim())}</span>`).join('')}</div></section>
          <section><h4 class="m-h">STEPS</h4><ol class="m-ol">${x.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol></section>
          <section><h4 class="m-h">EXPECTED OUTPUT</h4><p>Printed results matching the output panel once the code runs.</p></section>
        </div>
        <div class="ide">
          <div class="ide-bar"><span class="lights"><i></i><i></i><i></i></span><span class="file">experiment_${x.n}.py</span>
            <button id="resetCode" title="Reset code"><i data-lucide="rotate-ccw"></i>Reset</button><button id="copyCode" title="Copy code"><i data-lucide="copy"></i>Copy</button></div>
          <div class="editor"><div class="gut" id="gut"></div><pre id="hl" aria-hidden="true"></pre><textarea id="code" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Python code editor"></textarea></div>
          <div class="run-bar"><span class="hint">Ctrl/⌘ + Enter to run · simulated runtime</span><button class="btn solid" id="runCode">RUN CODE <i data-lucide="play"></i></button></div>
          <div class="out" id="out" aria-live="polite"><span class="mut">// output will appear here</span></div>
        </div>
      </div>`, trigger);

    const ta = $('#code'), hl = $('#hl'), gut = $('#gut'), out = $('#out');
    ta.value = x.code;
    const sync = () => {
      hl.innerHTML = highlight(ta.value);
      gut.textContent = ta.value.split('\n').map((_, i) => i + 1).join('\n');
      hl.scrollTop = gut.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft;
    };
    ta.addEventListener('input', sync);
    ta.addEventListener('scroll', () => { hl.scrollTop = gut.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText('    ', s, ta.selectionEnd, 'end'); sync(); }
      else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); }
    });
    sync();
    $('#resetCode').addEventListener('click', () => { ta.value = x.code; sync(); });
    $('#copyCode').addEventListener('click', async e => {
      const b = e.currentTarget;
      try { await navigator.clipboard.writeText(ta.value); b.innerHTML = 'Copied'; } catch (_) { ta.select(); b.innerHTML = 'Select + copy'; }
      setTimeout(() => { b.innerHTML = '<i data-lucide="copy"></i>Copy'; icons(); }, 1400);
    });
    $('#runCode').addEventListener('click', run);

    function run() {
      clearTimeout(runTimer);
      if (locked) { out.innerHTML = '<span class="err">Experiment locked — complete Experiment 09 to unlock.</span>'; return; }
      const code = ta.value;
      out.innerHTML = `<span class="mut">$ python experiment_${x.n}.py</span>\n<span class="spin"></span><span class="mut">running…</span>`;
      runTimer = setTimeout(() => {
        if (!code.trim()) { out.innerHTML = '<span class="mut">$ python</span>\n<span class="err">Nothing to run.</span>'; return; }
        const bad = /^\s*(import|from)\s*$/m.test(code) || (code.match(/\(/g) || []).length !== (code.match(/\)/g) || []).length;
        if (bad) { out.innerHTML = `<span class="mut">$ python experiment_${x.n}.py</span>\n<span class="err">SyntaxError: invalid syntax (check imports and parentheses)</span>`; return; }
        const lines = x.out.split('\n'); out.innerHTML = `<span class="mut">$ python experiment_${x.n}.py</span>\n`;
        let i = 0;
        (function step() {
          if (i < lines.length) { out.insertAdjacentHTML('beforeend', esc(lines[i++]) + '\n'); out.scrollTop = out.scrollHeight; runTimer = setTimeout(step, reduce ? 0 : 60); }
          else {
            out.insertAdjacentHTML('beforeend', '\n<span class="pr">✓ Finished in ' + (0.4 + Math.random() * 0.9).toFixed(2) + 's · exit code 0</span>');
            out.scrollTop = out.scrollHeight;
            if (x.status !== 'COMPLETED') { x.status = 'COMPLETED'; renderExperiments(); }
          }
        })();
      }, reduce ? 0 : 700);
    }
  }
  overlay.addEventListener('transitionend', () => { if (overlay.hidden) clearTimeout(runTimer); });

  /* ---------- TOOLS ---------- */
  const toolGrid = $('#toolGrid');
  let toolCat = 'All';
  const cats = ['All', ...new Set(TOOLS.map(t => t.cat))];
  $('#toolFilter').innerHTML = cats.map(c => `<button data-f="${c}" class="${c === 'All' ? 'on' : ''}">${c.toUpperCase()}</button>`).join('');
  function renderTools() {
    const q = $('#toolSearch').value.trim().toLowerCase();
    const list = TOOLS.filter(t => (toolCat === 'All' || t.cat === toolCat) && (t.name + t.role + t.tags.join(' ')).toLowerCase().includes(q));
    toolGrid.innerHTML = list.map(t => `
      <article class="tool" tabindex="0" role="button" data-name="${t.name}" aria-label="Explore ${t.name}">
        <div class="ico"><i data-lucide="${t.icon}"></i></div>
        <h3>${t.name}</h3><p class="role">${t.role}</p>
        <div class="tags">${t.tags.map(g => `<span>${g}</span>`).join('')}</div>
        <span class="more">EXPLORE <i data-lucide="arrow-right"></i></span>
      </article>`).join('');
    $('#toolEmpty').hidden = list.length > 0;
    icons();
  }
  toolGrid.addEventListener('click', e => { const el = e.target.closest('.tool'); if (el) openTool(el.dataset.name, el); });
  toolGrid.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('tool')) { e.preventDefault(); openTool(e.target.dataset.name, e.target); } });
  $('#toolSearch').addEventListener('input', renderTools);
  $('#toolFilter').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    toolCat = b.dataset.f; $$('#toolFilter button').forEach(x => x.classList.toggle('on', x === b)); renderTools();
  });
  function openTool(name, trigger) {
    const t = TOOLS.find(x => x.name === name);
    openModal(`
      <div class="t-hero"><div class="ico"><i data-lucide="${t.icon}"></i></div><div><div class="m-no" style="margin:0">${t.cat.toUpperCase()}</div><h2 id="mTitle" style="margin:4px 0 0">${t.name}</h2></div></div>
      <p class="m-desc">${esc(t.desc)}</p>
      <h4 class="m-h">USED FOR</h4><div class="tags">${t.tags.map(g => `<span>${g}</span>`).join('')}</div>
      <h4 class="m-h" style="margin-top:22px">QUICK START</h4>
      <div class="snippet">${highlight(t.code).replace(/\n$/, '')}</div>`, trigger);
  }

  /* ---------- NAV ---------- */
  const nav = $('#navLinks'), indicator = $('#indicator'), burger = $('#burger');
  function moveIndicator(a) {
    if (!a) { indicator.style.opacity = 0; return; }
    indicator.style.width = a.offsetWidth - 32 + 'px';
    indicator.style.transform = `translateX(${a.offsetLeft + 16}px)`;
    indicator.style.opacity = 1;
  }
  const links = $$('a', nav);
  let activeTab = null;
  function setActive(id) {
    activeTab = id;
    links.forEach(a => a.classList.toggle('on', a.dataset.tab === id));
    moveIndicator(links.find(a => a.dataset.tab === id));
  }
  const sections = $$('[data-section]');
  function spy() {
    const y = innerHeight * 0.35; let cur = null;
    sections.forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) cur = s.id; });
    if (cur !== activeTab) setActive(cur);
  }
  addEventListener('scroll', spy, { passive: true });
  addEventListener('resize', () => moveIndicator(links.find(a => a.dataset.tab === activeTab)));
  burger.addEventListener('click', () => {
    const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
    burger.innerHTML = `<i data-lucide="${o ? 'x' : 'menu'}"></i>`; icons();
  });
  nav.addEventListener('click', e => { if (e.target.closest('a') && nav.classList.contains('open')) { burger.click(); } });
  $$('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); $('#' + a.dataset.go).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }));

  /* ---------- ANIMATIONS ---------- */
  function countUp(el) {
    const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, pad = +el.dataset.pad || 0;
    const fmt = v => { const s = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US'); return pad ? s.padStart(pad, '0') : s; };
    if (reduce) { el.textContent = fmt(end); return; }
    const t0 = performance.now(), dur = 1500;
    (function f(t) { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(end * e); if (p < 1) requestAnimationFrame(f); })(t0);
  }
  $$('[data-ascii]').forEach(el => { const [a, b] = el.dataset.ascii.split('/').map(Number); el.innerHTML = '█'.repeat(a) + '<u>' + '░'.repeat(b - a) + '</u>'; });
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const t = en.target; io.unobserve(t); t.classList.add('in');
    $$('[data-count]', t).forEach(countUp); if (t.dataset.count) countUp(t);
    $$('.pbar i[data-w]', t).forEach(i => (i.style.width = i.dataset.w + '%'));
    $$('.bar b[data-w]', t).forEach(i => (i.style.width = i.dataset.w + '%'));
    if (t.id === 'lineChart' || $('#lineChart', t)) drawChart(true);
  }), { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));
  $$('[data-count]').forEach(el => { if (!el.closest('.reveal')) io.observe(el); });

  /* ---------- HERO CHARTS ---------- */
  const FEATURES = [['tenure_months', 92], ['monthly_charges', 78], ['contract_type', 64], ['support_calls', 47], ['age', 31], ['region', 18]];
  $('#bars').innerHTML = FEATURES.map(([k, v]) => `<div class="bar"><span>${k}</span><i><b data-w="${v}"></b></i><span>${(v / 100).toFixed(2)}</span></div>`).join('');
  const N = 24, W = 400, H = 140;
  const acc = [], loss = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    acc.push(0.55 + 0.4 * (1 - Math.exp(-4.5 * t)) + Math.sin(i * 1.7) * 0.012);
    loss.push(0.9 * Math.exp(-3.2 * t) + 0.08 + Math.cos(i * 1.3) * 0.015);
  }
  const path = a => a.map((v, i) => `${i ? 'L' : 'M'}${(i / (N - 1) * W).toFixed(1)},${(H - 10 - v * (H - 24)).toFixed(1)}`).join(' ');
  $('#accLine').setAttribute('d', path(acc)); $('#lossLine').setAttribute('d', path(loss));
  $('#area').setAttribute('d', path(acc) + ` L${W},${H} L0,${H} Z`);
  const chartSvg = $('#lineChart');
  chartSvg.style.clipPath = reduce ? 'inset(0)' : 'inset(0 100% 0 0)';
  function drawChart(go) { if (!go) return; chartSvg.style.transition = 'clip-path 2s cubic-bezier(.3,.7,.2,1)'; requestAnimationFrame(() => (chartSvg.style.clipPath = 'inset(0)')); }

  /* ---------- BACKGROUND CANVAS ---------- */
  const cv = $('#bgCanvas'), ctx = cv.getContext('2d');
  let pts = [], cw = 0, ch = 0, raf = 0;
  const SYM = ['Σ', 'μ', 'σ', 'π', '∫', 'β', 'λ', 'x̄'];
  function sizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 2); cw = innerWidth; ch = innerHeight;
    cv.width = cw * dpr; cv.height = ch * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(60, Math.floor(cw * ch / 22000));
    pts = Array.from({ length: n }, (_, i) => ({ x: Math.random() * cw, y: Math.random() * ch, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, s: i % 9 === 0 ? SYM[i % SYM.length] : null }));
  }
  function frame() {
    ctx.clearRect(0, 0, cw, ch);
    for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > cw) p.vx *= -1; if (p.y < 0 || p.y > ch) p.vy *= -1; }
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) { ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 130) * 0.13})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    ctx.font = '14px "JetBrains Mono", monospace';
    for (const p of pts) {
      if (p.s) { ctx.fillStyle = 'rgba(139,148,158,.22)'; ctx.fillText(p.s, p.x, p.y); }
      else { ctx.fillStyle = 'rgba(34,211,238,.35)'; ctx.fillRect(p.x, p.y, 2, 2); }
    }
    raf = requestAnimationFrame(frame);
  }
  sizeCanvas(); addEventListener('resize', sizeCanvas);
  if (reduce) frame(), cancelAnimationFrame(raf); else frame();
  document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) frame(); });

  /* ---------- INIT ---------- */
  renderModules(); renderExperiments(); renderTools(); icons(); spy();
})();
