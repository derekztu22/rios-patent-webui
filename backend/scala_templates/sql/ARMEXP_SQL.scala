spark.sql(
    s"""
        |CREATE OR REPLACE TEMPORARY VIEW assignee_disambiguated
        |USING csv
        |OPTIONS (path '/patent/uspto/csv/g_assignee_disambiguated.csv', header 'true', multiline 'true', escape '"')
        |""".stripMargin)

spark.sql(
    s"""
        |CREATE OR REPLACE TEMPORARY VIEW patent
        |USING csv
        |OPTIONS (path '/patent/uspto/csv/g_patent.csv', header 'true', multiline 'true', escape '"')
        |""".stripMargin)

val filteredAssigneeDF = spark.sql("SELECT disambig_assignee_organization, patent_id FROM assignee_disambiguated WHERE disambig_assignee_organization LIKE '%Arm Limited%'")
val filteredPatentDF = spark.sql("SELECT  patent_id, patent_date FROM patent")

val df = filteredAssigneeDF.join(filteredPatentDF, Seq("patent_id"))

val rowdfnumber = df.count()


val filteredDFbytime = df.filter(year(col("patent_date")) < 2005).orderBy(desc("patent_date"))
filteredDFbytime.show(30)

val sortedString = filteredDFbytime.limit(100).toJSON.collectAsList().toString()
sortedString