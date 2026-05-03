# ⚡ Energy Consumption Prediction Project

This project is basically an end-to-end machine learning workflow where I worked on predicting household energy usage using real-world data. The idea was to not just build a model, but understand the full pipeline — from raw data to deployment.

---

## 📌 What I did in this project

I started with a dataset containing electricity consumption readings (like voltage, current, sub-metering, etc.). At first, the data was in a text format, so I had to properly load and understand its structure.

Then I moved step by step:

* Explored the dataset (EDA)
* Checked missing values, distributions, and outliers
* Understood relationships between features using correlation
* Selected important input features based on that

---

## 🔍 Feature Selection

Based on correlation analysis, I selected the most relevant features:

* Global Intensity
* Sub Metering (1, 2, 3)
* Voltage
* Global Reactive Power

Target variable for regression:

* `Global_active_power`

---

## 📈 Linear Regression (Prediction)

First, I built a **Linear Regression model** to predict actual energy consumption.

Steps:

* Split data into train/test
* Trained model
* Evaluated using:

  * MAE (Mean Absolute Error)
  * R² Score

The model performed extremely well because energy variables are strongly related (especially intensity and power).

---

## 🔁 Classification (Logistic Regression)

Then I converted the problem into classification:

* Created a new column: `usage_type`
* Used mean value as threshold:

  * Above mean → High Usage (1)
  * Below mean → Low Usage (0)

Built a **Logistic Regression model** to classify usage.

Evaluation:

* Accuracy
* Confusion Matrix
* Classification Report

The results were highly accurate, and the confusion matrix showed very few misclassifications.

---

## ⚖️ Class Balance Check

I also checked for class imbalance.

Result:

* ~58% vs ~42%

This is reasonably balanced, so I didn’t use SMOTE or any resampling technique.

---

## 💾 Model Saving

Both models were saved using `pickle`:

* `linear_regression_model.pkl`
* `logistic_model.pkl`

This allows reuse without retraining.

---

## 🌐 Deployment (Gradio + Hugging Face)

I created a simple UI using Gradio where users can input:

* Intensity
* Voltage
* Sub-metering values
* Reactive power

And the app outputs:

* Predicted energy consumption
* Usage category (High / Low)

Finally, I deployed it using Hugging Face Spaces.

---




Hugging Face link:
👉 [[Live App Link](https://myethishwar-energy-prediction-system-using-linea-a6a2d5b.hf.space/?logs=container&__theme=system&deep_link=J_laZ0BDuJ0)]

---

That’s it — simple, practical, and complete.
