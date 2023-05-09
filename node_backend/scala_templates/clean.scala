package org.rioslab.spark.core.CPC

import org.apache.spark.SparkConf
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

object TemplateSQL {
  def main(args: Array[String]) : Unit = {
    val config = new SparkConf()
      .setMaster("local[*]") //
      .setAppName("Template SQL Application")

    val spark = SparkSession.builder().config(config).getOrCreate()
    import spark.implicits._

    val df = spark
      .read
      .option("header", "true")
      .option("multiline", "true")
      .option("escape", "\"")
      .csv("patent/patent_cleaned.csv")

    // Code Here
    
  }
}