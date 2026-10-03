# VARA Model v2.0 - Security Hardening & Obfuscation ProGuard Rules

# 1. Bytecode Shrinking & Aggressive Optimization
-repackageclasses 'com.vara.internal'
-allowaccessmodification
-optimizationpasses 5
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*

# 2. Prevent Source Information Leakage
-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod

# 3. Anti-Tamper & Cryptographic Replay Engine Rules
-keep class com.vara.risk.governance.crypto.** { *; }
-keep class org.bouncycastle.** { *; }
-dontwarn org.bouncycastle.**

# 4. Strict Network & Security API Rules
-keep class androidx.security.crypto.** { *; }
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**

# 5. Model Classes (Keep serializable JSON fields for Evidence Bundles)
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# 6. Remove all debug logs from production release builds
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
    public static int i(...);
}
