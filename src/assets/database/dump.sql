
CREATE TABLE IF NOT EXISTS reminderTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reminderDate TEXT,
  icon TEXT,
);

INSERT or IGNORE INTO reminderTable(id, reminderDate, [description], icon) VALUES (1, '029/08/2021 21:07', 'Inserir SQLite no app', 'happy');
