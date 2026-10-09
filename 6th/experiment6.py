import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Experiment 6: Statistical Analysis
# Run: python experiment6.py
# Install dependencies: pip install -r requirements.txt

def main():
    # Sample dataset: replace these values with your own data if needed.
    data = {
        "Student": ["A", "B", "C", "D", "E", "F", "G", "H"],
        "Marks": [78, 85, 92, 67, 74, 88, 95, 81]
    }
    df = pd.DataFrame(data)

    marks = df["Marks"]

    print("=" * 45)
    print("EXPERIMENT 6: STATISTICAL ANALYSIS")
    print("=" * 45)
    print("\nDataset:")
    print(df.to_string(index=False))

    print("\nStatistical Measures")
    print("-" * 25)
    print(f"Count              : {marks.count()}")
    print(f"Mean               : {marks.mean():.2f}")
    print(f"Median             : {marks.median():.2f}")
    print(f"Mode               : {marks.mode().tolist()}")
    print(f"Minimum            : {marks.min()}")
    print(f"Maximum            : {marks.max()}")
    print(f"Range              : {marks.max() - marks.min()}")
    print(f"Variance           : {marks.var():.2f}")
    print(f"Standard Deviation : {marks.std():.2f}")
    print(f"25th Percentile    : {marks.quantile(0.25):.2f}")
    print(f"75th Percentile    : {marks.quantile(0.75):.2f}")

    print("\nInterpretation:")
    print(f"The average mark is {marks.mean():.2f}.")
    print(f"Marks vary around the mean with a standard deviation of {marks.std():.2f}.")

    # Create and save charts.
    plt.figure(figsize=(8, 5))
    plt.hist(marks, bins=5, edgecolor="black")
    plt.title("Distribution of Student Marks")
    plt.xlabel("Marks")
    plt.ylabel("Number of Students")
    plt.tight_layout()
    plt.savefig("marks_histogram.png", dpi=150)
    plt.show()

    plt.figure(figsize=(7, 4))
    plt.boxplot(marks, vert=False)
    plt.title("Box Plot of Student Marks")
    plt.xlabel("Marks")
    plt.tight_layout()
    plt.savefig("marks_boxplot.png", dpi=150)
    plt.show()

    print("\nCharts saved as marks_histogram.png and marks_boxplot.png")

if __name__ == "__main__":
    main()
