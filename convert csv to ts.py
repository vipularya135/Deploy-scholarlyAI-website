import pandas as pd

# Load CSV file
def csv_to_ts(csv_path, ts_path):
    df = pd.read_csv(csv_path)
    
    # Define the TypeScript template
    ts_template = """
export interface Professor {
  id: string;
  name: string;
  institution: string;
  department: string;
  departmentId: string;
  imageUrl: string;
  hIndex: number;
  i10Index: number;
  publications: number;
  citations: number;
  bio: string;
  researchInterests: string[];
  email?: string;
  profileLink?: string;
}

export const professors: Professor[] = [
"""
    
    professors_data = []
    for _, row in df.iterrows():
        professor_entry = f"""
  {{
    id: "{row['Name'].lower().replace(' ', '_')}",
    name: "{row['Name']}",
    institution: "{row['College/Company']}",
    department: "{row.get('Affiliation', 'Unknown')}",
    departmentId: "{row.get('Affiliation', 'Unknown').lower().replace(' ', '_')}",
    imageUrl: "",
    hIndex: {row['h-index']},
    i10Index: {row['i10-index']},
    publications: 0,
    citations: {row['Citations']},
    bio: "Professor at {row['College/Company']} specializing in {row['Research Interest 1']}.",
    researchInterests: ["{row['Research Interest 1']}", "{row['Research Interest 2']}"]
  }}"""
        professors_data.append(professor_entry)
    
    ts_content = ts_template + ",\n".join(professors_data) + "\n];"
    
    # Save to TypeScript file
    with open(ts_path, "w", encoding="utf-8") as ts_file:
        ts_file.write(ts_content)

# Example usage
csv_to_ts("4_updated_professor_data.csv", "professorData.ts")




