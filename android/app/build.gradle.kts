import java.util.Properties
import java.io.FileInputStream

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

// Load signing credentials securely from local keystore.properties or CI environment variables
val keystorePropertiesFile = rootProject.file("keystore.properties")
val keystoreProperties = Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
    namespace = "com.vara.risk.governance"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.vara.risk.governance"
        minSdk = 26
        targetSdk = 35
        versionCode = 20000
        versionName = "2.0.0-FROZEN"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }

        // Hardened Native C++ / NDK Obfuscation Flags
        ndk {
            abiFilters.addAll(setOf("armeabi-v7a", "arm64-v8a", "x86_64"))
        }

        manifestPlaceholders["networkSecurityConfig"] = "@xml/network_security_config"
    }

    signingConfigs {
        create("release") {
            val keyStorePath = System.getenv("VARA_KEYSTORE_FILE") 
                ?: keystoreProperties.getProperty("storeFile") 
                ?: "vara-release-key.jks"
            val storePass = System.getenv("VARA_KEYSTORE_PASSWORD") 
                ?: keystoreProperties.getProperty("storePassword") 
                ?: ""
            val keyAliasName = System.getenv("VARA_KEY_ALIAS") 
                ?: keystoreProperties.getProperty("keyAlias") 
                ?: "vara_release_alias"
            val keyPass = System.getenv("VARA_KEY_PASSWORD") 
                ?: keystoreProperties.getProperty("keyPassword") 
                ?: ""

            if (file(keyStorePath).exists() && storePass.isNotEmpty()) {
                storeFile = file(keyStorePath)
                storePassword = storePass
                keyAlias = keyAliasName
                keyPassword = keyPass
                enableV1Signing = true
                enableV2Signing = true
                enableV3Signing = true
                enableV4Signing = true
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")

            // Zero plain text API keys: Injected via secure native or environment proxy
            buildConfigField("String", "VARA_GATEWAY_URL", "\"https://api.vara-governance.org/v2/secure\"")
            buildConfigField("Boolean", "ENABLE_STRICT_AUDIT", "true")
            buildConfigField("Boolean", "ENFORCE_REPLAY_SEAL", "true")

            ndk {
                debugSymbolLevel = "FULL"
            }
        }

        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
            buildConfigField("String", "VARA_GATEWAY_URL", "\"https://dev-api.vara-governance.org/v2\"")
            buildConfigField("Boolean", "ENABLE_STRICT_AUDIT", "true")
            buildConfigField("Boolean", "ENFORCE_REPLAY_SEAL", "false")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
        freeCompilerArgs += listOf(
            "-opt-in=kotlin.RequiresOptIn",
            "-Xjvm-default=all"
        )
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.14"
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
            excludes += "/META-INF/INDEX.LIST"
            excludes += "/META-INF/io.netty.versions.properties"
        }
    }

    bundle {
        language {
            enableSplit = false // Retain full Farsi and English offline resources
        }
        density {
            enableSplit = true
        }
        abi {
            enableSplit = true
        }
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.5")
    implementation("androidx.activity:activity-compose:1.9.2")
    
    // Jetpack Compose BOM
    implementation(platform("androidx.compose:compose-bom:2024.09.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")

    // Hardware-backed Android Keystore & EncryptedSharedPreferences (Security Hardening)
    implementation("androidx.security:security-crypto:1.1.0-alpha06")

    // OkHttp with Certificate Pinning & TLS 1.3
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // Cryptographic Signatures (Bouncy Castle for SECP256k1 & SHA-256 Replay Seals)
    implementation("org.bouncycastle:bcprov-jdk18on:1.78.1")
}
